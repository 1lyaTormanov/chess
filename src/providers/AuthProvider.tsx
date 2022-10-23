import React, {createContext, FC, useEffect} from "react";
import {useRootSelector} from "../hooks";
import {tokenSelector} from "../saga/selectors/auth";
import {useLocation} from "react-router";
import {LOGIN} from "../routes";
import {loginActions} from "../saga/actions/actions";
import {history} from "../saga/connect";

export const AuthContext = createContext<string>('');

interface Provider{
    children: React.ReactNode
}

export const AuthProvider: FC<Provider> = (props) => {
    const token = useRootSelector(tokenSelector)
    const location = useLocation();

    useEffect(()=> {
        if(location.pathname === LOGIN){
            localStorage.removeItem('token');
            loginActions.SUCCESS.creator('')
        }
        else{
            if(!token){
                history.push(LOGIN)
            }
        }
    },[location.pathname, token])

    return(
        <AuthContext.Provider value={token}>
            {props.children}
        </AuthContext.Provider>
    )
}