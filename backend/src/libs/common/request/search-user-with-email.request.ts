import { BaseRequest } from '@src/common/core';
import { IsNotEmpty } from 'class-validator';

export class SearchUserWithEmailRequest extends BaseRequest<SearchUserWithEmailRequest> {
  @IsNotEmpty()
  emailString: string;
}
