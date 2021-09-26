import { BaseRequest } from '@src/common/core';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddNewContactRequest extends BaseRequest<AddNewContactRequest> {
  @IsNotEmpty()
  contactId: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;
}
