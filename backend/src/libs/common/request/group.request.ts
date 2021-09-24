import { BaseRequest } from '@src/common/core';
import {
  ArrayNotEmpty,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GroupDto } from '@src/dto/group.dto';

export class GroupRequest extends BaseRequest<GroupRequest> {
  @Type(() => GroupDto)
  @IsObject()
  payload: GroupDto;
}
