import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn, BeforeUpdate, BeforeInsert, ManyToMany, JoinTable
} from 'typeorm';
import {SexEnum} from "../enum/sex.enum";
import bcrypt from 'bcryptjs';
import {RoleEnum} from "../enum/role.enum";
import {BooksEntity} from "./books.entity";
import {Exclude} from "class-transformer";

@Entity({
    name: 'users',
    engine: 'InnoDB DEFAULT CHARSET=utf8',
})
export class UsersEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({nullable: true})
    firstName?: string;

    @Column({nullable: true})
    lastName?: string;

    @Column({unique: true, nullable: true})
    email?: string;

    @Column({type: 'tinyint', default: SexEnum.FEMALE})
    sex: SexEnum;

    @Column({nullable: true, type: 'int'})
    age: number;

    @Exclude()
    @Column({select: false})
    password: string;

    @Column({default: RoleEnum.USER})
    role: RoleEnum;

    @Column({default: 0})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToMany(() => BooksEntity, (book) => book.id)
    @JoinTable()
    books: BooksEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
        }
    }

    checkIfPasswordMatch(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}

