import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class UserDto extends BaseDto<UserDto> {
  @IsString()
  @IsOptional()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  isOnline: boolean;
}
