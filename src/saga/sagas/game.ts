import { call, put, takeEvery } from 'redux-saga/effects'
import {submitParamsApi} from "../../api/api_requests/game";
import {GameParams} from "../../types";
import {gameParamsActions} from "../actions/actions";

function* submitGameParams(action: GameParams){
    try{
        // @ts-ignore
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