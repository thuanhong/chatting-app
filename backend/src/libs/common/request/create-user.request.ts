import { BaseRequest } from '@src/common/core';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '@src/dto/user.dto';

export class CreateUserRequest extends BaseRequest<CreateUserRequest> {
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @IsArray()
  @ArrayNotEmpty()
  payload: UserDto[];
}
