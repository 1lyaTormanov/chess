import {ChangeEvent, useState} from 'react';
import { useSetState} from "react-use";

import {Schema, SchemaFieldsValidated, ValidatedFieldResponse, ValueToFields} from "./types";

export function useValidate<T extends string>(data: Schema<T>){
    const [schema, setSchema] = useSetState<SchemaFieldsValidated<T>>(initialFields());
    const [isSubmitted, setIsSubmitted] = useState(false);

    function initialFields () {
        let res: SchemaFieldsValidated<T> | undefined = undefined;

        for(let i in data.schema){
            if(res){
                res = {...res, ...{[i] : {value: '', isTouched: false}}} as SchemaFieldsValidated<T>;
            }
            else{
                res = {[i] : {value: '', isTouched: false}} as SchemaFieldsValidated<T>
            }
        }
        return res
    }


    const checkFields = (name: T, value: string, renderCond: boolean) => {
        const field = data.schema[name];
        let values = {};

        for(let key in schema){
            values = {...values,[key]: schema[key].value}
        }
        const errors = field.handlers.filter(handler => {
            const h = handler(value, values as ValueToFields<T>);
            return !h.isValid
        }).map(i => i(value, values as ValueToFields<T>).errorText);

        const fieldData: Partial<ValidatedFieldResponse<T>> = { value: value, isTouched: true };
        setSchema(
            {[name]: !renderCond ?
                    fieldData:
                    { errors: errors, isValid: !errors.length, value: value, isTouched: true } } as SchemaFieldsValidated<T>);
    }

    const handleField = (e: ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as unknown as T;
        const value = e.target.value;

        checkFields(fieldName, value,
            (!data.validateOnSubmit && isSubmitted)
            || (!data.validateOnSubmit && !isSubmitted));
    }


    const onSubmit = (callback: (values?: SchemaFieldsValidated<T>) => void)=> {
        setIsSubmitted(true);
        for(let key in data.schema){
            if(schema[key]){
                checkFields(key, schema[key].value ?? '', true);
            }
        }
        callback(schema);

    }

    return {
        fields: schema,
        onChange: handleField,
        onSubmit: onSubmit,
        isFieldsValid: Object.entries(schema).map(([i, data]) => data).every(i => {
            const elem = i as ValidatedFieldResponse<T>
            return elem.isValid
        })
    }

}




