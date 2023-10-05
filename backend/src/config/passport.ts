import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from 'config/config'
import UsersService from "../routes/v1/users/users.service";

import { tokenTypes } from './tokens'

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload:any, done:any) => {
    try {
        const userService = new UsersService();
        if (payload.type !== tokenTypes.ACCESS) {
            throw new Error('Invalid token type');
        }
        const user = await userService.findOne(payload.id, true);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy