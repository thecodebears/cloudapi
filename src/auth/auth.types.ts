/**
 * Response codes.
 */
export enum AuthResponse {
    /**
     * Success responses.
     */
    AuthSessionClosed='AuthSessionClosed',
    Registered='Registered',
    LoggedOut='LoggedOut',

    /**
     * Error responses.
     */
    InvalidArguments='InvalidArguments',
    AuthSessionNotExists='AuthSessionNotExists',
    UsernameWasTaken='UsernameWasTaken',
    UserNotFound='UserNotFound',
    InvalidPassword='InvalidPassword',
    AlreadyLoggedIn='AlreadyLoggedIn'
}

export type UserAuthorizationData = {
    username?: string,
    token?: string
};