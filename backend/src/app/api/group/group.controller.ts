import { Controller, Logger, Get, Param } from '@nestjs/common';
import { MultipleGroupChatResponse } from '@src/response/multi-group-chat.response';
import { GroupService } from './group.service';

@Controller('/api/v1/group-chat')
export class GroupController {
  constructor(private groupService: GroupService) {}
  private readonly logger = new Logger(GroupController.name);

  @Get(':userId')
  async getUserGroupChat(
    @Param('userId') userId: string,
  ): Promise<MultipleGroupChatResponse> {
    const groupChatData = await this.groupService.getUserGroupChat(userId);
    return new MultipleGroupChatResponse({
      groups: groupChatData,
    });
  }
}
