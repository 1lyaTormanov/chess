import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects'
import {submitParamsApi} from "../../api/api_requests/game";
import {GameParams, GameParamsR} from "../../types";
import {gameParamsActions} from "../actions/actions";

function* submitGameParams(action: GameParams): Generator<StrictEffect, any, GameParamsR>{
    try{
        const params = yield call(submitParamsApi, action)
        yield put(gameParamsActions.SUCCESS.creator(params))
    }
    catch (e) {
        yield put(gameParamsActions.FAILURE.creator({error: 'Ошибка', code: 400}))
    }
}


export function* gameSaga(){
    yield takeEvery(gameParamsActions.REQUEST.type, submitGameParams);
}