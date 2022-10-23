import {GameParams} from "../../gameTypes";
import {authEndpoint, gameEndpoint, userEndpoint} from "../routes";
import {CreateUserDto} from "../../generalTypes";
import {Api} from "../wrapApi";

export const submitParamsApi = (body: GameParams)=> Api({method: 'POST', body: body, url: gameEndpoint.submitGameParams})
export const createUserRequest = (body: CreateUserDto) => Api({method: 'POST', body: body, url: userEndpoint.createUser})
export const login = (body: CreateUserDto) => Api({method: 'POST', body: body, url: authEndpoint.auth})