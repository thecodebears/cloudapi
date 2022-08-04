/**
 * Users finding parameters
 */
export type UsersFindQuery = {
    id?: string,
    username?: string
};

/**
 * Response codes.
 */
export enum UserResponse {
    /**
     * Success responses.
     */
    Valid='Valid',
    Updated='Updated',
    Destroyed='Destroyed',
    ClientLoggedIn='LoggedIn',
    ClientLoggedOut='LoggedOut',
    ApplicationProvided='ApplicationProvided',
    ApplicationRemoved='ApplicationProvided',

    /**
     * Error responses.
     */
    NotFound='NotFound',
    NotValid='NotValid',
    UsernameWasTaken='UsernameWasTaken',
    ClientAlreadyLoggedIn='ClientAlreadyLoggedIn',
    ClientNotLoggedIn='ClientNotLoggedIn',
    ApplicationAlreadyProvided='ApplicationAlreadyProvided',
    ApplicationNotProvided='ApplicationNotProvided'
}