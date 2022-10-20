import {combineReducers} from "redux";
import {createReducer} from "../redux_utils/utils";
import {ColorType, GameParams, GameType} from "../../types";
import {gameParamsActions} from "../actions/actions";

const initialParams: GameParams = {figuresColor: ColorType.BLACK, start: false, type: GameType.SINGLE}

export const gameReducer = combineReducers({
    params: createReducer<GameParams, GameParams>(initialParams)
        .createBranch(gameParamsActions.SUCCESS.type, (state, action) => ({...state, ...action.payload}))
})