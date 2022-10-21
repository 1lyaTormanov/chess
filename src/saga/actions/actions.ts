import {createAsyncGroup} from "../redux_utils/utils";
import {ErrorType, GameParams, GameParamsR} from "../../types";

export const gameParamsActions = createAsyncGroup<GameParams, GameParamsR, ErrorType, null >('game', 'params');



