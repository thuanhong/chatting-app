import { BaseRequest } from '@src/common/core';
import {
  IsOptional,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsString,
  isString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '@src/dto/user.dto';

export class CreateUserRequest extends BaseRequest<CreateUserRequest> {
  // @IsNotEmpty()
  // @IsString()
  // token: string;

  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @IsArray()
  @ArrayNotEmpty()
  payload: UserDto[];



}
