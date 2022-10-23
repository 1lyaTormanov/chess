
export const gameEndpoint = {
    submitGameParams : `${process.env.REACT_APP_API_URL}/game/params`
}

export const userEndpoint = {
    createUser: `${process.env.REACT_APP_API_URL}/user/create`,
}

export const authEndpoint = {
    auth: `${process.env.REACT_APP_API_URL}/auth/login`
}