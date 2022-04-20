export const AUTHED_USER = 'AUTHED_USER'

export function setAuthedUser(user) {
    return {
        type: AUTHED_USER,
        user
    }
}