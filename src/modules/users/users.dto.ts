import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/app/utils/decorators';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nameOrganization: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class CreateLoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}

export class ConfirmEmailUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  code: string;
}

export class ResetPasswordUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  email: string;
}

export class UpdateResetPasswordUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  token: string;
}

export class UpdateUserPasswordDto {
  @IsOptional()
  @MaxLength(100)
  @MinLength(8)
  @IsString()
  password: string;

  @IsString()
  @MaxLength(100)
  @MinLength(8)
  newPassword: string;

  @IsString()
  @MaxLength(100)
  @MinLength(8)
  @Match('newPassword')
  passwordConfirm: string;
}

export class UpdateOneEmailUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;
}
