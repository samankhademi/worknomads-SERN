import { Request } from 'express'
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import {catchAsync} from 'middlewares/catchAsync';
import userService from './profile.service'
import {UsersEntity} from "../../../common/entities/users.entity";

const UserServices = new userService()

export const getUser = catchAsync(async (req:Request) => {
    const result = req.user;
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return { result, code: httpStatus.OK }
});

export const setUser = catchAsync(async (req:Request) => {
    const result = await UserServices.updateUser((req.user as UsersEntity)?.id, req.body);
    return { result, code: httpStatus.OK }
});

export const changeUserPassword = catchAsync(async (req:Request) => {
    const result = await UserServices.updatePassword((req.user as UsersEntity)?.id, req.body);
    return { result, code: httpStatus.OK }
});

export default {
    updateUser: changeUserPassword,
    getUser,
}