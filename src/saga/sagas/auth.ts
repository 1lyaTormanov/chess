import {ActionType} from "../redux_utils/types";
import {CreateUserDto} from "../../generalTypes";
import {call, put, StrictEffect, takeEvery} from "redux-saga/effects";
import {login} from "../../api/api_requests/ApiCalls";
import {loginActions} from "../actions/actions";
import {history} from "../connect";
import {MAIN_PAGE} from "../../routes";

function* auth(action: ActionType<CreateUserDto>): Generator<StrictEffect, any, {access_token: string}>{
    try{
        const token = yield call(login,action.payload)
        console.log(token)
        localStorage.setItem('token', JSON.stringify(token.access_token))
        history.push(MAIN_PAGE)
        yield put(loginActions.SUCCESS.creator(token.access_token))
    }
    catch (e) {
        yield put(loginActions.FAILURE.creator({error: 'Ошибка', code: 400}))
    }
}

export function* authSaga(){
    yield takeEvery(loginActions.REQUEST.type, auth)
}