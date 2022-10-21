import axios from "axios";
import {GameParams} from "../../types";
import {gameEndpoint} from "../routes";

export const submitParamsApi = (body: GameParams)=> axios.post(gameEndpoint.submitGameParams, body ).then(res => res.data)