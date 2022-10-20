export type ActionTypes = 'REQUEST' | 'SUCCESS' | 'FAILURE' | 'CANCELED'

export interface Creator<T>{
    type: string,
    payload: T
}

export interface Action<T> {
    type: string,
    creator: (payload: T) => Creator<T>
}


export type TypeToAction<R, S, F, C> = {
    REQUEST: Action<R>,
    SUCCESS: Action<S>,
    FAILURE: Action<F>,
    CANCELED: Action<C>
}


export type ReducerT<StateT, ActionT> = (state: StateT, action: ActionT ) => StateT


export type ActionType<T> = {
    type: string,
    payload: T
}

export type HandlersT<S, A> = {
    [k in ActionType<A>["type"]] : ReducerT<S, ActionType<A>>
}