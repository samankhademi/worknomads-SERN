import express from "express";
import { getUser, changeUserPassword, setUser} from './profile.controller';
import {ChangePasswordDto} from './dto/changePassword.dto'
import {UpdateUserDto} from './dto/updateUser.dto'
import Validator from 'middlewares/validator'
import Auth from 'middlewares/auth'

const router = express.Router();

router.use('/', Auth())
router.route('/').get(getUser);
router.route('/').put(Validator(UpdateUserDto), setUser);

router.route('/change-password').patch(Validator(ChangePasswordDto),changeUserPassword)

export default router;
