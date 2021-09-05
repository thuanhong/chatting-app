import { BaseRequest } from '@src/common/core';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '@src/dto/user.dto';

export class CreateUserRequest extends BaseRequest<CreateUserRequest> {
  @IsNotEmpty()
  @IsString()
  token: string;

  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @IsArray()
  @ArrayNotEmpty()
  payload: UserDto[];
}
