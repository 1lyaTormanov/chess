import {AppDispatch, RootState} from "./saga/connect";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useRootDispatch: () => AppDispatch = useDispatch
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector