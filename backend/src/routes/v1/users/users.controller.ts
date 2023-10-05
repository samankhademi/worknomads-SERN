import { Request } from 'express'
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import {catchAsync} from 'middlewares/catchAsync';
import userService from './users.service'

const UserServices = new userService()

export const createUser = catchAsync(async (req:Request) => {
        const result = await UserServices.create(req.body);
        return { result, code: httpStatus.CREATED }
});

export const getUsers = catchAsync(async (req:Request) => {
    const result = await UserServices.findAll(req.query);
    return { result, code: httpStatus.OK }
});

export const getUser = catchAsync(async (req:Request) => {
    const result = await UserServices.findOne(+req.params.userId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return { result, code: httpStatus.OK }
});

export const updateUser = catchAsync(async (req:Request) => {
    const result = await UserServices.update(+req.params.userId, req.body);
    return { result, code: httpStatus.OK }
});

export const deleteUser = catchAsync(async (req:Request) => {
    const result = await UserServices.delete(+req.params.userId);
    return { result, code: httpStatus.NO_CONTENT }
});

export default {
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,
}