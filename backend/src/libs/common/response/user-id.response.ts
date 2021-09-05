import { BaseResponse } from '@src/common/core';
import { Users } from '@src/entities/users.entity';

export class UserIdReponse extends BaseResponse<UserIdReponse> {
  user: Users;
}
