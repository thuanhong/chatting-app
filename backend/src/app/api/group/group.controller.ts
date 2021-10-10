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
import { NotificationService } from '@src/services/notification.service';
import { MultipleNotificationResponse } from '@src/response/multi-notification.response';

@Controller('/api/v1/group-chat')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private notificationService: NotificationService,
  ) {}
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
  ): Promise<MultipleGroupChatResponse> {
    const Group: GroupDto = {
      ...userGroup.payload,
    };
    await this.groupService.updateUserGroupChat(id, Group);
    return new MultipleGroupChatResponse({
      groups: [],
    });
  }

  @Get('notification')
  async getUserNotification(
    @Req() req: any,
  ): Promise<MultipleNotificationResponse> {
    const { uid: userId } = req.user;
    const userNotification = await this.notificationService.getUserNotification(
      userId,
    );
    return new MultipleNotificationResponse({
      notification: userNotification,
    });
  }
}
