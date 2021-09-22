import { BaseRequest } from '@src/common/core';
import { IsNotEmpty } from 'class-validator';

export class AddNewContactRequest extends BaseRequest<AddNewContactRequest> {
  @IsNotEmpty()
  contactId: string;
}
