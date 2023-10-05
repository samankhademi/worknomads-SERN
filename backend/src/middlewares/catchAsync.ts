import {Request, Response, NextFunction} from 'express'

export const catchAsync = (fn:any) => (req:Request, res:Response, next:NextFunction) => {
    Promise
        .resolve(fn(req, res, next))
        .then((result) => {
            res.status(result.code || 200).json({ message: result.result, statusCode: result.code || 200 });
        })
        .catch((err) => next(err));
};

