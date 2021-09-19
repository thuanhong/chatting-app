import { Controller, Logger, Get, Req } from '@nestjs/common';
import { MultipleGroupChatResponse } from '@src/response/multi-group-chat.response';
import { GroupService } from './group.service';

@Controller('/api/v1/group-chat')
export class GroupController {
  constructor(private groupService: GroupService) {}
  private readonly logger = new Logger(GroupController.name);

  @Get()
  async getUserGroupChat(@Req() req: any): Promise<MultipleGroupChatResponse> {
    const groupChatData = await this.groupService.getUserGroupChat(
      req.user.uid,
    );
    return new MultipleGroupChatResponse({
      groups: groupChatData,
    });
  }
}
