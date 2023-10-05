import {
  IsBoolean,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  ISBN: string;

  @IsOptional()
  @IsString()
  bookTitle: string;

  @IsOptional()
  @IsString()
  publisher: string;

  @IsOptional()
  @IsNumber()
  yearOfPublication: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

}
