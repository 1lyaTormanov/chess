import {createReducer} from "../redux_utils/utils";
import {loginActions} from "../actions/actions";

const token = ''
export const authReducer = createReducer<string, string>(token)
    .createBranch(loginActions.SUCCESS.type, (_,action) => action.payload)