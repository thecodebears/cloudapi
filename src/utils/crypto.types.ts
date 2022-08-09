export type Token = [ string, TokenProtectedData ];

export type TokenProtectedData = {
    scopes: string[]
}