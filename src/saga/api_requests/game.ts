import axios from "axios";
import {GameParams} from "../../types";

export const submitParamsApi = (body: GameParams)=> axios.post('http://localhost:8000/game/params', body )