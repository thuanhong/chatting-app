import { IsString, IsNotEmpty } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class ContactDto extends BaseDto<ContactDto> {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  contactId: string;
}
