import { BaseResponse } from '@src/common/core';
import { Message } from '@src/entities/message.entity';

export class MessageChatResponse extends BaseResponse<MessageChatResponse> {
  data: Message[];
}
