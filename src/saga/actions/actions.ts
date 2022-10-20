import {createAsyncGroup} from "../redux_utils/utils";
import {ErrorType, GameParams} from "../../types";

export const gameParamsActions = createAsyncGroup<GameParams, GameParams, ErrorType, null >('game', 'params');

