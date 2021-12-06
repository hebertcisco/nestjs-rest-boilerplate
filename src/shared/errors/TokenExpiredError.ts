export default class TokenExpiredError {
    public message: string;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public data: object;

    public statusCode: number;

    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(message: string, data?: object, statusCode = 501) {
        this.message = message;
        this.statusCode = statusCode;

        if (data) {
            this.data = data;
        }
    }
}
