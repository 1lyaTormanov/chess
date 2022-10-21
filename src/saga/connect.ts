import {combineReducers, createStore, applyMiddleware} from "redux";
import {gameReducer} from "./reducers/game";
import createSagaMiddleware from 'redux-saga'
import {gameSaga} from "./sagas/game";

export const rootReducer = combineReducers({
    params: gameReducer
})
const sagaMiddleware = createSagaMiddleware()

export type RootState = ReturnType<typeof rootReducer>


export const connect = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(gameSaga)