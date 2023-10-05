import {Repository} from 'typeorm'
import DataSource from 'common/database/datasource'
import {LoginDto} from "./dto/auth.dto";
import ApiError from "utils/ApiError";
import HttpStatus from "http-status";
import {JwtPayload} from "types/JwtPayload";
import {createAdminJwtToken} from "utils/createJwtToken";
import {UsersEntity} from "common/entities/users.entity";
import {tokenTypes} from "config/tokens";

export default class AuthService {
    private UserRepository:Repository<UsersEntity>
    constructor() {
        this.UserRepository = DataSource.getRepository(UsersEntity);
    }

    async login(userDto:LoginDto) {
        try{
            const { email, password } = userDto;

            const user = await this.UserRepository.findOne({ where: { email, isActive: true }, select: { password: true, firstName: true, lastName: true, id: true, role: true, createdAt: true, email: true }  });
            if (!user) {
                throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid Username or Password")
            }
            const compareUser = user.checkIfPasswordMatch(password);

            if (!compareUser) {
                throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid Username or Password")
            }

            const jwtPayload: JwtPayload = {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
                type: tokenTypes.ACCESS,
                created_at: user.createdAt,
            };
            try {
                const token = createAdminJwtToken(jwtPayload)
                const { password, ...userResponse } = user;
                return { token, user: { ...userResponse} }
            }catch (error){
                throw error;
            }
        }catch (error){
            throw error;
        }
    }
}