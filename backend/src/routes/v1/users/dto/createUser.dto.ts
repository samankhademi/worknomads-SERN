import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {SexEnum} from "common/enum/sex.enum";
import {RoleEnum} from "common/enum/role.enum";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsString()
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsNumber()
  age: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  books?: number[];
}
