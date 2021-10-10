import { Injectable } from '@nestjs/common';
import { DataService } from '@src/libs/services/data.service';
import { Message } from '@src/libs/entities/message.entity';
import { InsertResult } from 'typeorm';
import { PagingInfo } from '@src/libs/interface/paging-info.interface';

@Injectable()
export class ChatService {
  constructor(private dataService: DataService) {}
  async getMessagesByGroupId(
    groupId: string,
    pageInfo: PagingInfo,
  ): Promise<Message[]> {
    return await this.dataService.find(Message, {
      select: ['senderId', 'content', 'groupId', 'createdAt'],
      where: {
        groupId: groupId,
      },
      take: pageInfo.take ?? 15,
      skip: pageInfo.pageIndex * pageInfo.take ?? 1,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async saveMessageByGroupId(
    groupId: string,
    content: string,
    senderId: string,
  ): Promise<InsertResult> {
    return await this.dataService.insert(Message, {
      groupId,
      content,
      senderId,
    });
  }
}
