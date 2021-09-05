import { BaseResponse } from '@src/common/core';
import { Users } from '@src/entities/users.entity';

export class UserReponse extends BaseResponse<UserReponse> {
  users: Users[];
}
