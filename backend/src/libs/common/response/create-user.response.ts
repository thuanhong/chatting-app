import { BaseResponse } from '@src/common/core';
//import { UserToken } from '@src/libs/interface/user-token-info.interface';
export class CreateUserResponse extends BaseResponse<CreateUserResponse> {
  message: string;
  data: object;
}
