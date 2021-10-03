import { IsString, IsNotEmpty } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class NotificationDto extends BaseDto<NotificationDto> {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  notifyType: string;

  @IsNotEmpty()
  @IsString()
  notifyDesc: string;

  @IsNotEmpty()
  @IsString()
  status: boolean | null;
}
