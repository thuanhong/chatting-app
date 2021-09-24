import { IsString, IsOptional } from 'class-validator';
import { BaseDto } from '@src/dto/base.dto';

export class GroupDto extends BaseDto<GroupDto> {
  @IsString()
  @IsOptional()
  id: string;

  @IsOptional()
  @IsString()
  groupName: string;

  @IsOptional()
  @IsString()
  modifiedAt: string;

  @IsOptional()
  @IsString()
  lastMessage: string;

  // @IsString()
  // @IsOptional()
  // messages: string;

  // @IsString()
  // @IsOptional()
  // userGroups: string;
}
