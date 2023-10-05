import { Request} from 'express'

import httpStatus from 'http-status';

import {catchAsync} from 'middlewares/catchAsync';
import authService from './auth.service'

const AuthServices = new authService()

export const login = catchAsync(async (req: Request) => {
    const result = await AuthServices.login(req.body);
    return {result, code: httpStatus.CREATED}
});

export default {
    login,
}