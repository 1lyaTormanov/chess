import {createAsyncGroup} from "../redux_utils/utils";
import {ErrorType, GameParams, GameParamsR} from "../../gameTypes";
import {CreateUserDto, UserI} from "../../generalTypes";

export const gameParamsActions = createAsyncGroup<GameParams, GameParamsR, ErrorType, null >('game', 'params');
export const createUserActions = createAsyncGroup<CreateUserDto, UserI, ErrorType, null>('user', 'create');
export const loginActions = createAsyncGroup<CreateUserDto, string, ErrorType, null>('auth', 'login');