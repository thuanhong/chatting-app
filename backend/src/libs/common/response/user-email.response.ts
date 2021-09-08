import { BaseResponse } from '@src/common/core';
import { Users } from '@src/entities/users.entity';

export class UserEmailReponse extends BaseResponse<UserEmailReponse> {
  user: Users;
}
