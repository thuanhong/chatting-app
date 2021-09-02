import { BaseResponse } from '@src/libs/common/core';

export class CheckHealthResponse extends BaseResponse<CheckHealthResponse> {
  message: string;
}
