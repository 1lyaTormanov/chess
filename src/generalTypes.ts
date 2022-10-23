export type RegistrationTypes = 'username' | 'password' | 'confirm'

export type AuthTypes = 'username' | 'password'

export type UserI = {
    id: number,
    username: string,
    password: string,
}

export type CreateUserDto = Omit<UserI, 'id'>