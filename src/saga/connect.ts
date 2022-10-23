import {combineReducers, createStore, applyMiddleware} from "redux";
import {gameReducer} from "./reducers/game";
import createSagaMiddleware from 'redux-saga'
import {gameSaga} from "./sagas/game";
import {userReducer} from "./reducers/user";
import { all } from "redux-saga/effects";
import {createUserSaga} from "./sagas/user";
import {authReducer} from "./reducers/auth";
import {authSaga} from "./sagas/auth";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory()

export const rootReducer = combineReducers({
    params: gameReducer,
    user: userReducer,
    auth: authReducer,
})
const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga(){
    yield all([gameSaga(), createUserSaga(), authSaga()])
}
export const connect = createStore(rootReducer, applyMiddleware(sagaMiddleware))

export type RootState = ReturnType<typeof connect.getState>
export type AppDispatch = typeof connect.dispatch

sagaMiddleware.run(rootSaga)