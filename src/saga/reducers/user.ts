import {createReducer} from "../redux_utils/utils";
import {CreateUserDto, UserI} from "../../generalTypes";
import {createUserActions} from "../actions/actions";

const initialState: UserI = {id: 0, password: "", username: ""}

export const userReducer = createReducer<UserI, CreateUserDto>(initialState)
    .createBranch(createUserActions.SUCCESS.type, (state, action) => ({...state, ...action.payload}))