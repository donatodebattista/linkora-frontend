export type User = {
    name: string
    email: string
    handle: string
}

export type RegisterCredentials = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    passwordConfirmation: string
}

export type LoginCredentials = Pick<User, 'email'> & {
    password: string}