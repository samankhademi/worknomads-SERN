import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'books',
  engine: 'InnoDB DEFAULT CHARSET=utf8',
})
export class BooksEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true, unique: true })
  ISBN?: string;

  @Column({ nullable: true })
  bookTitle?: string;

  @Column({ nullable: true, type: 'int' })
  yearOfPublication?: number;

  @Column({ nullable: true })
  publisher: string;

  @Column({ default: 0 })
  isActive: boolean;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

