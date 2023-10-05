import { Request } from 'express'
import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import {catchAsync} from 'middlewares/catchAsync';
import bookService from './books.service'

const BookServices = new bookService()

export const createBook = catchAsync(async (req:Request) => {
        const result = await BookServices.create(req.body);
        return { result, code: httpStatus.CREATED }
});

export const getBooks = catchAsync(async (req:Request) => {
    const result = await BookServices.findAll(req.query);
    return { result, code: httpStatus.OK }
});

export const getBook = catchAsync(async (req:Request) => {
    const result = await BookServices.findOne(+req.params.id);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    return { result, code: httpStatus.OK }
});

export const updateBook = catchAsync(async (req:Request) => {
    const result = await BookServices.update(+req.params.id, req.body);
    return { result, code: httpStatus.OK }
});

export const deleteBook = catchAsync(async (req:Request) => {
    const result = await BookServices.delete(+req.params.id);
    return { result, code: httpStatus.NO_CONTENT }
});

export default {
    createBook,
    updateBook,
    getBooks,
    getBook,
    deleteBook,
}