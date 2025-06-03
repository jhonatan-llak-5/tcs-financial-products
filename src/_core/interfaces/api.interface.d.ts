export interface IApiResponse<T> {
    data: T;
    message: string;
    status: string;
    total_data?: number;
}

export interface IHttpError {
    error: IApiErrorResponse;
    message: string;
    name: string;
    status: number;
    statusText: string;
    url: string;
}

export interface IApiErrorResponse {
    data: null;
    message: string;
    status: string
}