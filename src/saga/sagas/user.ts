import {call, put, StrictEffect, takeEvery} from "redux-saga/effects";
import {CreateUserDto, UserI} from "../../generalTypes";
import {createUserActions} from "../actions/actions";
import {createUserRequest} from "../../api/api_requests/ApiCalls";
import {ActionType} from "../redux_utils/types";
import {history} from "../connect";
import {LOGIN} from "../../routes";

function* createUser(action: ActionType<CreateUserDto>): Generator<StrictEffect, any, UserI>{
    try{
        const response  = yield call(createUserRequest, action.payload)

        yield put(createUserActions.SUCCESS.creator(response))
        history.push(LOGIN)
    }
    catch (e) {
        yield put(createUserActions.FAILURE.creator({error: 'Ошибка', code: 400}))
    }
}


export function* createUserSaga(){
    yield takeEvery(createUserActions.REQUEST.type, createUser)
}