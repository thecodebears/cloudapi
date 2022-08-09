export type APIError = {
    error?: string
};

export type APIResponse<T> = T & APIError;