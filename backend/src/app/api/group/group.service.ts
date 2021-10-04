import { Injectable } from '@nestjs/common';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/libs/entities/user-group.entity';
import { DataService } from '@src/libs/services/data.service';
import { In, Not } from 'typeorm';
import { PagingInfo } from '@src/interface/paging-info.interface';
import { GroupDto } from '@src/libs/common/dto/group.dto';
import { Users } from '@src/libs/entities/users.entity';

@Injectable()
export class GroupService {
  constructor(private dataService: DataService) {}
  async getUserGroupChat(
    userId: string,
    pageInfo: PagingInfo,
  ): Promise<GroupChat[]> {
    const allGroupId = await this.dataService.find(UserGroup, {
      select: ['groupId', 'userId'],
      where: {
        userId: userId,
      },
    });

    return await this.dataService.find(GroupChat, {
      select: ['id', 'groupName', 'lastMessage'],
      where: {
        id: In(allGroupId.map((contact) => contact.groupId)),
      },
      take: pageInfo.take ?? 15,
      skip: pageInfo.pageIndex * pageInfo.take ?? 1,
      order: {
        modifiedAt: 'DESC',
      },
    });
  }

  async updateUserGroupChat(id: string, entities: GroupDto): Promise<any> {
    return await this.dataService.update(GroupChat, id, {
      ...entities,
    });
  }
}
