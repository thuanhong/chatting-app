import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Request,
  Query,
  Param,
} from '@nestjs/common';
import { CreateUserResponse } from '@src/response/create-user.response';
import { CreateUserRequest } from '@src/request/create-user.request';
import { ChatService } from './chat.service';
import { MessageChatResponse } from '@src/libs/common/response/messages-chat.response';
import { PagingInfo } from '@src/libs/interface/paging-info.interface';

@Controller('/api/v1/message')
export class ChatController {
  constructor(private chatService: ChatService) {}
  private readonly logger = new Logger(ChatController.name);

  @Post()
  async saveMessages(
    @Request() req: any,
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    request.payload[0].email = req.user.email;
    return new CreateUserResponse({
      message: 'success',
    });
  }

  @Get(':id')
  async getMessages(
    @Param() id: string,
    @Query() query?: PagingInfo,
  ): Promise<MessageChatResponse> {
    try {
      const data = await this.chatService.getMessagesByGroupId(id, query);
      return new MessageChatResponse({
        data: data.sort(
          (a, b) =>
            Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)),
        ),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
