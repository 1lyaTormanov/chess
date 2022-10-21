import {ActionType, ActionTypes, HandlersT, ReducerT, TypeToAction} from "./types";

export const createReducer = <S, A>(initialState: S, h? : HandlersT<S, A>) => {
    const handlers: HandlersT<S, A> = {...h}

    const handleReducer = (
        state = initialState,
        action: ActionType<A>
    ): ReducerT<S, ActionType<A>> | S => {

        if (handlers.hasOwnProperty(action.type)) {
            const reducer = handlers[action.type];

            return reducer(state, action);
        } else {
            return state;
        }
    };


    const createBranch = (type: string | string[], callback: ReducerT<S, ActionType<A>> ) => {
        const newHandlers: typeof handlers = {}
        const toArray = Array.isArray(type) ? [...type]: [type];

        toArray.forEach(i => {
            newHandlers[i] = callback;
        })

        return createReducer(initialState, Object.assign(handlers, newHandlers))
    }

    return Object.assign(handleReducer,{
        createBranch: createBranch
    })
}


export function createAsyncGroup<R, S, F, C>(group: string, prefix: string){

    const renderAction = (variant: ActionTypes) => {
        return `@${group}/${prefix}_'${variant}'`.toUpperCase()
    }

    const wrapCreator = <T>(data: T,type: ActionTypes) => {
        return {
            type: renderAction(type),
            payload: data
        }
    }

    const result: TypeToAction<R, S ,F, C>  = {
        REQUEST: {
            type: renderAction('REQUEST'),
            creator: (data: R)=> {
                return wrapCreator(data, 'REQUEST')
            }
        },
        SUCCESS: {
            type: renderAction('SUCCESS'),
            creator: (data: S)=> {
                return wrapCreator(data, 'SUCCESS')}
        },
        FAILURE: {
            type: renderAction('FAILURE'),
            creator: (data: F)=> {
                return wrapCreator(data, 'FAILURE')}
        },
        CANCELED: {
            type: renderAction('CANCELED'),
            creator: (data: C)=> {
                return wrapCreator(data, 'CANCELED')
            }
        }
    };

    return result
}






