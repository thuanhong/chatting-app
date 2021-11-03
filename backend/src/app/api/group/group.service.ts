import { Injectable } from '@nestjs/common';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/libs/entities/user-group.entity';
import { DataService } from '@src/libs/services/data.service';
import { In } from 'typeorm';
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
    try {
      const allGroupId = await this.dataService.find(UserGroup, {
        select: ['groupId', 'userId'],
        where: {
          userId: userId,
        },
      });
      if (allGroupId.length === 0) {
        return [];
      }
      const listGroupId = allGroupId.map((contact) => contact.groupId);
      if (!listGroupId || listGroupId.length === 0) {
        return [];
      }
      const getUsers = await (
        await this.dataService.asQuery(Users, 'users')
      )
        .leftJoinAndSelect('users.userGroups', 'userGroups')
        .where('userGroups.group_id IN(:...listGroupId)', { listGroupId })
        .getRawMany()
        .then((groups) => groups.filter((group) => group.users_id !== userId));

      let listGroupChat = await this.dataService.find(GroupChat, {
        select: ['id', 'groupName', 'lastMessage'],
        where: {
          id: In(listGroupId),
        },
        take: pageInfo.take ?? 15,
        skip: pageInfo.pageIndex * pageInfo.take ?? 1,
        order: {
          modifiedAt: 'DESC',
        },
      });
      let newList = listGroupChat.map((res) => {
        let infoUser = getUsers.filter(
          (col) => col.userGroups_group_id === res.id,
        );
        return { ...res, infoUser: { ...infoUser[0] } };
      });
      return newList;
    } catch (e) {
      console.log('LIST API GROUP', e);
      return e;
    }
  }

  async updateUserGroupChat(id: string, entities: GroupDto): Promise<any> {
    return await this.dataService.update(GroupChat, id, {
      ...entities,
    });
  }
}
