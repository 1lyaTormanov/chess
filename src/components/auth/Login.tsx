import * as React from 'react'
import {FC} from "react";
import {Schema} from "../../validation/types";
import {AuthTypes} from "../../generalTypes";
import {useValidate} from "../../validation/validation";
import {Input} from "../utility_components/Input";
import {useDispatch} from "react-redux";
import {loginActions} from "../../saga/actions/actions";

const LoginSchema: Schema<AuthTypes> = {
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
    }
}


export const Login:FC = () => {
    const {fields, onChange, onSubmit} = useValidate(LoginSchema);
    const dispatch = useDispatch();

    const submit = ()=> {
        if(fields.username.value && fields.password.value){
            dispatch(loginActions.REQUEST.creator({username: fields.username.value, password: fields.password.value}))
        }
    }

    return(
        <div>
            <h2>
                Логин
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

            <button onClick={()=> onSubmit(submit)}>
                Войти
            </button>
        </div>
    )
}