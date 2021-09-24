import {
  Controller,
  Logger,
  Get,
  Req,
  Query,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { MultipleGroupChatResponse } from '@src/response/multi-group-chat.response';
import { GroupService } from './group.service';
import { PagingInfo } from '@src/interface/paging-info.interface';
import { GroupDto } from '@src/libs/common/dto/group.dto';
import { GroupRequest } from '@src/libs/common/request/group.request';
@Controller('/api/v1/group-chat')
export class GroupController {
  constructor(private groupService: GroupService) {}
  private readonly logger = new Logger(GroupController.name);

  @Get()
  async getUserGroupChat(
    @Req() req: any,
    @Query() query: PagingInfo,
  ): Promise<MultipleGroupChatResponse> {
    const groupChatData = await this.groupService.getUserGroupChat(
      req.user.uid,
      query,
    );
    return new MultipleGroupChatResponse({
      groups: groupChatData,
    });
  }

  @Put(':id')
  async updateUserGroupChat(
    @Param() id: string,
    @Body() userGroup: GroupRequest,
    @Req() req,
  ): Promise<MultipleGroupChatResponse> {
    const Group: GroupDto = {
      ...userGroup.payload,
    };
    const groupChatData = await this.groupService.updateUserGroupChat(
      id,
      Group,
    );
    return new MultipleGroupChatResponse({});
  }
}
