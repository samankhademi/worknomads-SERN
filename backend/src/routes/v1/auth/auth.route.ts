import express from "express";
import {login} from './auth.controller';
import {LoginDto} from './dto/auth.dto'
import Validator from 'middlewares/validator'

const router = express.Router();

router
    .route('/')
    .post(Validator(LoginDto),login)

export default router;
