import {combineReducers, createStore} from "redux";
import {gameReducer} from "./reducers/game";

export const rootReducer = combineReducers({
    params: gameReducer
})


export type RootState = ReturnType<typeof rootReducer>


export const connect = createStore(rootReducer)