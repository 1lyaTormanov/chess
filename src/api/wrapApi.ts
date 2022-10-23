export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type BaseApiCall<M extends ApiMethod,T> = {
    method: M,
    url: string,
    body: T
}

export type WrapApi<M extends ApiMethod,T> = M extends 'GET'? Omit<BaseApiCall<M,T>, 'body'> : BaseApiCall<M,T>

export const Api = <M extends ApiMethod,T>(data: WrapApi<M,T> ) => {
    const baseBody = data.method === 'GET' ? {method: 'GET'} : {method: data.method, body: JSON.stringify(data.body)}
    return fetch(data.url, {
        ...baseBody,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .catch(e => {
        if(e.status === 401){
            window.location.pathname = '/login'
        }
    })
}
