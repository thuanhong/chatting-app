import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
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

  @IsOptional()
  @IsString()
  readonly picture?: string;

  @IsOptional()
  @IsArray()
  readonly usersId?: [];
}
