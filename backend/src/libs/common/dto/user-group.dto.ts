import { IsString, IsNotEmpty } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class UserGroupDto extends BaseDto<UserGroupDto> {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsNotEmpty()
  isActive: boolean;
}
