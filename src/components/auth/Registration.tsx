import * as React from 'react'
import {FC} from "react";
import {Input} from "../utility_components/Input";
import {Schema, SchemaFieldsValidated} from "../../validation/types";
import {RegistrationTypes} from "../../generalTypes";
import {useValidate} from "../../validation/validation";
import {useDispatch} from "react-redux";
import {createUserActions} from "../../saga/actions/actions";


const RegistrationSchema: Schema<RegistrationTypes> = {
    validateOnSubmit: false,
    schema: {
        username: {
            value: '',
            handlers: [
                (value)=> {
                    return {
                        isValid: !!value.length,
                        errorText: 'Введите значение'
                    }
                },
                (value)=> {
                    return {
                        isValid: value.includes('@'),
                        errorText: 'Email должен включать в себя собаку'
                    }
                }
            ]
        },
        password: {
            handlers: [
                (value)=> {
                    return {
                        isValid: !!value.length,
                        errorText: 'Введите значение'
                    }
                },
                (value)=> {
                    return {
                        isValid: value.length >= 6,
                        errorText: 'Пароль должен состоять минимум из 6х символов'
                    }
                }
            ],
            value: '',
        },
        confirm: {
            handlers: [
                (value)=> {
                    return {
                        isValid: !!value.length,
                        errorText: 'Введите значение'
                    }
                },
                (value)=> {
                    return {
                        isValid: value.length >= 6,
                        errorText: 'Пароль должен состоять минимум из 6х символов'
                    }
                },
                (value, schema)=> {
                        return {
                            isValid: value === schema.password,
                            errorText: 'Пароли не совпадают'
                        }
                }
            ],
            value: '',
        }
    }
}

export const Registration: FC = () => {
    const {fields, onChange, onSubmit} = useValidate(RegistrationSchema);
    const dispatch = useDispatch();

    const submit = ()=> {
        if(fields.username.value && fields.password.value){
            dispatch(createUserActions.REQUEST.creator({username: fields.username.value, password: fields.password.value}))
        }
    }

    return (
        <div>
            <h2>
                Регистрация
            </h2>
                <Input type={'text'} errors={fields.username.errors}
                       isValid={fields.username.isValid}
                       value={fields.username.value}
                       onChange={onChange}
                       name={'username'}/>
                <Input type={'password'}
                       errors={fields.password.errors}
                       isValid={fields.password.isValid}
                       value={fields.password.value}
                       onChange={onChange}
                       name={'password'}/>
                <Input type={'password'}
                       errors={fields.confirm.errors}
                       isValid={fields.confirm.isValid}
                       value={fields.confirm.value}
                       onChange={onChange}
                       name={'confirm'}/>
                <button onClick={()=> onSubmit(submit)}>
                    create account
                </button>
        </div>
    )
}