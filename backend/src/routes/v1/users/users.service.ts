import {Equal, Repository, UpdateResult, ILike} from 'typeorm'
import {UsersEntity} from "common/entities/users.entity";
import DataSource from 'common/database/datasource'
import {CreateUserDto} from "./dto/createUser.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import booksService from "../books/books.service";
import {UserFilterRequest} from "types/userFilterRequest";

export default class UsersService {
    private UserRepository:Repository<UsersEntity>
    private BooksServices:booksService
    constructor() {
        this.UserRepository = DataSource.getRepository(UsersEntity);
        this.BooksServices = new booksService()
    }

    async create(userDto:CreateUserDto):Promise<UsersEntity | undefined> {
        try{
            const data = new UsersEntity();
            Object.entries(userDto).forEach(([key, val]) => {
                data[key] = val;
            })
            data.hashPassword()
            if(data.books) data.books = await this.BooksServices.getByIds(userDto.books);
            return this.UserRepository.save(data);
        }catch (error){
            throw error;
        }
    }

    async update(id: number, userDto:UpdateUserDto):Promise<UsersEntity> {
        try{
            const data = new UsersEntity();
            Object.entries(userDto).forEach(([key, val]) => {
                data[key] = val;
            })
            data.id = id;
            if(data?.password?.length > 0) {
                data.hashPassword()
            }else{
                delete data.password;
            }
            if(data.books) data.books = await this.BooksServices.getByIds(userDto.books);

            return await this.UserRepository.save({...data});
        }catch (error){
            throw error;
        }
    }

    async findOne(id:number, isActive: boolean = true):Promise<UsersEntity | undefined> {
        try{
            return this.UserRepository.findOne({where:  {id, isActive}, relations: { books: true } });
        }catch (error){
            throw error;
        }
    }

    async findAll(filter:Partial<UserFilterRequest>) {
        try{
            const { age, firstName, lastName, role, sex } = filter;
            let { page, take} = filter;
            page = +page || 1;
            take = +take || 10;
            const where = {}

            if (firstName) where['firstName'] = ILike(`%${firstName}%`)
            if (lastName) where['lastName'] = ILike(`%${lastName}%`)

            if (sex) where['sex'] = Equal(+sex)
            if (age) where['age'] = Equal(+age)
            if (role) where['role'] = role

            const result = await this.UserRepository.findAndCount({
                where,
                relations: { books: true },
                skip: (page - 1) * take,
                take
            });

            return {
                users: result[0],
                total: result[1],
                page,
                take,
            }
        }catch (error){
            throw error;
        }
    }

    async delete( id:number ):Promise<UpdateResult> {
        try{
            const user = await this.findOne(id);
            if (!user){
                throw new Error("Invalid User");
            }
            return await this.UserRepository.softDelete({ id })
        }catch (error){
            throw error;
        }
    }
}