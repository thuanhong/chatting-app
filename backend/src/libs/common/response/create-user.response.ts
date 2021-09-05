import { BaseResponse } from '@src/common/core';
import { UserDto } from '@src/dto/user.dto';

export class CreateUserResponse extends BaseResponse<CreateUserResponse> {
  token: string;
  user: UserDto;
}
