import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {SexEnum} from "common/enum/sex.enum";
import {RoleEnum} from "common/enum/role.enum";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @IsEnum(SexEnum)
  sex?: SexEnum;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  books: number[];

}
