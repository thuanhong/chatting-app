import { Injectable } from '@nestjs/common';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/libs/entities/user-group.entity';
import { DataService } from '@src/services/data.service';
import { In } from 'typeorm';
import { PagingInfo } from '@src/interface/paging-info.interface';
@Injectable()
export class GroupService {
  constructor(private dataService: DataService) {}
  async getUserGroupChat(
    userId: string,
    pageInfo: PagingInfo,
  ): Promise<GroupChat[]> {
    const all_group_id = await this.dataService.find(UserGroup, {
      select: ['groupId'],
      where: {
        userId: userId,
      },
    });

    return await this.dataService.find(GroupChat, {
      select: ['id', 'groupName', 'lastMessage'],
      where: {
        id: In(all_group_id.map((contact) => contact.groupId)),
      },
      take: pageInfo.take ?? 15,
      skip: pageInfo.pageIndex * pageInfo.take ?? 1,
      order: {
        modifiedAt: 'DESC',
      },
    });
  }
}
