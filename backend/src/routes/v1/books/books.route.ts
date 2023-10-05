import express from "express";
import { createBook, deleteBook, getBook, getBooks, updateBook } from './books.controller';
import {CreateBookDto} from './dto/createBook.dto'
import {UpdateBookDto} from './dto/updateBook.dto'
import Validator from 'middlewares/validator'
import Auth from 'middlewares/auth'
import {RoleEnum} from "common/enum/role.enum";

const router = express.Router();

router.use('/', Auth(RoleEnum.ADMIN))
router
    .route('/')
    .post(Validator(CreateBookDto),createBook)
    .get(getBooks);

router
    .route('/:id([0-9]+)')
    .get(getBook)
    .patch(Validator(UpdateBookDto),updateBook)
    .delete(deleteBook);

export default router;
