import { BaseResponse } from '@src/common/core';
import { GroupChat } from '@src/entities/group-chat.entity';

export class MultipleGroupChatResponse extends BaseResponse<MultipleGroupChatResponse> {
  groups: GroupChat[];
}
