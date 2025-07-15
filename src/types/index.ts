export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
}

export type RegisterCredentials = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    passwordConfirmation: string
}

export type LoginCredentials = Pick<User, 'email'> & {
    password: string}

export type ProfileForm = Pick<User, 'handle' | 'description'>