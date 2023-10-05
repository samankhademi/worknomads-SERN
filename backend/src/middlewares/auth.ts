import { Request, NextFunction } from 'express'
import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import {RoleEnum} from "common/enum/role.enum";

export const verifyCallback = (req:Request, resolve:any, reject:any, role?:RoleEnum) => async (err, user, info) => {

    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    if (role && user.role !== role) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
    resolve();
};

export const auth = (role?:RoleEnum) => async (req, res, next:NextFunction):Promise<NextFunction|void> => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, role))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

export default auth;