import {Repository, UpdateResult} from 'typeorm'
import {UsersEntity} from "common/entities/users.entity";
import DataSource from 'common/database/datasource'
import {ChangePasswordDto} from "./dto/changePassword.dto";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import {UpdateUserDto} from "./dto/updateUser.dto";

export default class ProfileService {
    private UserRepository:Repository<UsersEntity>
    constructor() {
        this.UserRepository = DataSource.getRepository(UsersEntity);
    }
    async updateUser(id: number, userDto:UpdateUserDto):Promise<UpdateResult> {
        try{
            const user = await this.UserRepository.findOne({ where: { id } })

            if (!user){
                throw new ApiError(httpStatus.FORBIDDEN, `User Access Error!`);
            }
            const data = new UsersEntity();
            Object.entries(userDto).forEach(([key, val]) => {
                data[key] = val;
            })

            return await this.UserRepository.update({id}, {...data});
        }catch (error){
            throw error;
        }
    }

    async updatePassword(id: number, userDto:ChangePasswordDto):Promise<UpdateResult> {
        try{
            const user = await this.UserRepository.findOne({ where: { id }, select: { password: true } })
            if (!user){
                throw new ApiError(httpStatus.FORBIDDEN, `User Access Error!`);
            }
            const passwordMatch = user.checkIfPasswordMatch(userDto.oldPassword)
            if (!passwordMatch){
               throw new ApiError(httpStatus.FORBIDDEN, `Old Password doesn't match!`);
            }
            user.password = userDto.newPassword;
            user.hashPassword()
            return await this.UserRepository.update({id},{...user});
        }catch (error){
            throw error;
        }
    }
}