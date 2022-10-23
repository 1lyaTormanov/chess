import {combineReducers} from "redux";
import {createReducer} from "../redux_utils/utils";
import {ColorType, GameParams, GameParamsR, GameType} from "../../gameTypes";
import {gameParamsActions} from "../actions/actions";

const initialParams: GameParams = {figuresColor: ColorType.BLACK, start: false, type: GameType.SINGLE}


export const gameReducer = combineReducers({
    params: createReducer<GameParams, GameParamsR>(initialParams)
        .createBranch(gameParamsActions.SUCCESS.type, (state, action) => ({...state, ...action.payload}))
})