import type {HttpStatus} from "http-status";

class ApiError extends Error {
    private statusCode: HttpStatus|number;
    private isOperational: boolean;
    public message: any;
    constructor(statusCode:HttpStatus|number, message:any, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.message = message;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;