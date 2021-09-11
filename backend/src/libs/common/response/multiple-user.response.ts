import { BaseResponse } from '@src/common/core';
import { Users } from '@src/entities/users.entity';

export class MultipleUserResponse extends BaseResponse<MultipleUserResponse> {
  users: Users[];
}
