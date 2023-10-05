import {In, Like, Repository, UpdateResult, Equal} from 'typeorm'
import {BooksEntity} from "common/entities/books.entity";
import DataSource from 'common/database/datasource'
import {CreateBookDto} from "./dto/createBook.dto";
import {UpdateBookDto} from "./dto/updateBook.dto";
import {BookFilterRequest} from "../../../types/bookFilterRequest";

export default class BooksService {
    private BookRepository:Repository<BooksEntity>
    constructor() {
        this.BookRepository = DataSource.getRepository(BooksEntity);
    }

    async create(bookDto:CreateBookDto):Promise<BooksEntity | undefined> {
        try{
            const data = new BooksEntity();
            Object.entries(bookDto).forEach(([key, val]) => {
                data[key] = val;
            })

            return this.BookRepository.save(data);
        }catch (error){
            throw error;
        }
    }

    async update(id: number, bookDto:UpdateBookDto):Promise<UpdateResult> {
        try{
            const data = new BooksEntity();
            Object.entries(bookDto).forEach(([key, val]) => {
                data[key] = val;
            })

            return await this.BookRepository.update({ id },{ ...data });
        }catch (error){
            throw error;
        }
    }

    async findOne(id:number):Promise<BooksEntity | undefined> {
        try{
            return this.BookRepository.findOneBy({ id });
        }catch (error){
            throw error;
        }
    }

    async findAll(filter:Partial<BookFilterRequest>) {
        try{
            const {bookTitle, ISBN, publisher, yearOfPublication} = filter;
            let { page, take} = filter;
            page = +page || 1;
            take = +take || 10;

            const where = {}

            if (bookTitle) where['bookTitle'] = Like(`%${bookTitle}%`)
            if (ISBN) where['ISBN'] = Like(`%${ISBN}%`)
            if (publisher) where['publisher'] = Like(`%${publisher}%`)
            if (yearOfPublication) where['yearOfPublication'] = Equal(+yearOfPublication)

            const result = await this.BookRepository.findAndCount({
                where,
                skip: (page - 1) * take,
                take
            });

            return {
                books: result[0],
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
            const books = await this.findOne(id);
            if (!books){
                throw new Error("Invalid Book");
            }
            return await this.BookRepository.softDelete({ id })
        }catch (error){
            throw error;
        }
    }

    async getByIds(ids: number[]): Promise<BooksEntity[]> {
        try {
            return await this.BookRepository.findBy({ id: In(ids) });
        } catch (error) {
            throw error;
        }
    }

}