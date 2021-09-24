import { Controller, Logger, Get, Req, Query, Put } from '@nestjs/common';
import { MultipleGroupChatResponse } from '@src/response/multi-group-chat.response';
import { GroupService } from './group.service';
import { PagingInfo } from '@src/interface/paging-info.interface';
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

  @Put()
  async updateUserGroupChat(
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
}
