import { BaseResponse } from '@src/common/core';

export class CheckHealthResponse extends BaseResponse<CheckHealthResponse> {
  message: string;
}
