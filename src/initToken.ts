import {connect} from "./saga/connect";
import {loginActions} from "./saga/actions/actions";

export function InitToken(){
    const token = localStorage.getItem('token');

    if(token && JSON.parse(token)){
        connect.dispatch(loginActions.SUCCESS.creator(JSON.parse(token)))
    }
}