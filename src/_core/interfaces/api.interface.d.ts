export interface IApiResponse<T> {
    data: T;
    message?: string;
}

export interface IApiError {
    message: string;
    name: string;
    stack: string;
}