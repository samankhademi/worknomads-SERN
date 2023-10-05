import * as express from 'express';
import {TypeORMError} from "typeorm";
import httpStatus from 'http-status'
import config from 'config/config'
import logger from 'config/logger'
import ApiError from 'utils/ApiError'

export const errorConverter = (err: ApiError | any, req: express.Request, res: express.Response) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof TypeORMError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode as any, message, false, err.stack);
    }
    let { statusCode, message } = error;
    if (config.env === 'production' && !error.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    if (config.env === 'development') {
        logger.error(err);
    }
    res
        .status(statusCode)
        .json({message, errorCode: statusCode, exceptionCode: httpStatus[statusCode]?.toUpperCase() })
        .send()
};
