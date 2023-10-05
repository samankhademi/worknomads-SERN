import jwt from 'jsonwebtoken';
import config from 'config/config'
import { JwtPayload } from 'types/JwtPayload';

export const createAdminJwtToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.validationTime,
    });
};
