import * as React from 'react'
import {FC, useEffect} from "react";
import {Routes} from "react-router-dom";
import {Route} from "react-router";
import {Registration} from "./components/auth/Registration";
import {Login} from "./components/auth/Login";
import {tokenSelector} from "./saga/selectors/auth";
import {useRootSelector} from "./hooks";
import App from "./App";
import {LOGIN, MAIN_PAGE, REGISTRATION} from "./routes";
import {AuthProvider} from "./providers/AuthProvider";

export const Root:FC = () => {
    const token = useRootSelector(tokenSelector)

    useEffect(()=> {
        if(!token && window.location.pathname !== LOGIN){
            window.location.pathname = LOGIN
        }

    },[token])

    return(
        <AuthProvider>
            <Routes>
                <Route path={MAIN_PAGE} element={<App/>} /> :
                <>
                    <Route path={REGISTRATION} element={<Registration/>} />
                    <Route path={LOGIN} element={<Login/>} />
                </>
            </Routes>
        </AuthProvider>
    )
}