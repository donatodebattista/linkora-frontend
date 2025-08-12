export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
    links: string // JSON string of SocialNetwork[]
}

export type RegisterCredentials = Pick<User, 'name' | 'email' | 'handle'> & {
    password: string
    passwordConfirmation: string
}

export type LoginCredentials = Pick<User, 'email'> & {
    password: string}

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type UserHandle = Pick<User, 'handle' | 'description' | 'name' | 'image' | 'links'>

//Para la BDD
export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type LinkoraLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'> 