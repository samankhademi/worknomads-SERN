import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  ISBN: string;

  @IsNotEmpty()
  @IsString()
  bookTitle: string;

  @IsNotEmpty()
  @IsString()
  publisher: string;

  @IsNotEmpty()
  @IsNumber()
  yearOfPublication: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
