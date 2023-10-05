import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from './users.controller';
import {CreateUserDto} from './dto/createUser.dto'
import {UpdateUserDto} from './dto/updateUser.dto'
import Validator from 'middlewares/validator'
import Auth from 'middlewares/auth'
import {RoleEnum} from "common/enum/role.enum";

const router = express.Router();

router.use('/', Auth(RoleEnum.ADMIN))
router
    .route('/')
    .post(Validator(CreateUserDto),createUser)
    .get(getUsers);

router
    .route('/:userId([0-9]+)')
    .get(getUser)
    .patch(Validator(UpdateUserDto),updateUser)
    .delete(deleteUser);

export default router;
