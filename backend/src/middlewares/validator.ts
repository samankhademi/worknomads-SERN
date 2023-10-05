import {validateSync, ValidationError} from "class-validator";
import {NextFunction, Request, Response} from "express";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

export const validator = (schema:any) => (req:Request, res:Response, next:NextFunction) => {

    try {
        const dtoValidator = new schema();
        Object.entries(req.body).forEach(([key, val]) => {
            dtoValidator[key] = val;
        })
        const formError = validateSync(dtoValidator);
        if (formError.length > 0) {
            const error = formError?.map((error: ValidationError) => ({
                field: error.property,
                errors: Object.keys(error.constraints).map((key) => error.constraints[key])
            }))
            return next(new ApiError(httpStatus.BAD_REQUEST, error));
        }
        next();
    }catch (error){
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error));
    }
}

export default validator