import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class UserDto extends BaseDto<UserDto> {
  @IsString()
  @IsOptional()
  id: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  middleName: string="kal";

  // @IsNotEmpty()
  // @IsString()
  isOnline: boolean=true;
}
