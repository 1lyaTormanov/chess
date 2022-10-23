import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects'
import {submitParamsApi} from "../../api/api_requests/ApiCalls";
import {GameParams, GameParamsR} from "../../gameTypes";
import {gameParamsActions} from "../actions/actions";
import {ActionType} from "../redux_utils/types";

function* submitGameParams(action: ActionType<GameParams>): Generator<StrictEffect, any, GameParamsR>{
    try{
        const params = yield call(submitParamsApi, action.payload)
        yield put(gameParamsActions.SUCCESS.creator(params))
    }
    catch (e) {
        yield put(gameParamsActions.FAILURE.creator({error: 'Ошибка', code: 400}))
    }
}


export function* gameSaga(){
    yield takeEvery(gameParamsActions.REQUEST.type, submitGameParams);
}