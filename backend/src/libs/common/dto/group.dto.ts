import { IsString, IsNotEmpty } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class GroupDto extends BaseDto<GroupDto> {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  groupName: string;

  @IsNotEmpty()
  @IsString()
  lastMessage: string;
}
