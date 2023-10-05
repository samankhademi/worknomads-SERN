import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import {SexEnum} from "common/enum/sex.enum";

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsNumber()
  age: number;
}
