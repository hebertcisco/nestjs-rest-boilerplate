export interface IErrorResponse {
    status: number;
    message: string;
}
export interface ISucessResponse {
    message: string;
    status: number;
}
export type IDatabaseErrorResponse = IErrorResponse;
