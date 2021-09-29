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
    const all_group_id = await this.dataService.find(UserGroup, {
      select: ['groupId', 'userId'],
      where: {
        userId: userId,
      },
    });

    const listNameUser = await this.dataService.find(Users, {
      select: ['firstName', 'lastName', 'id'],
      where: {
        id: In(all_group_id.map((contact) => contact.userId)),
      },
    });

    const listDisplayName = all_group_id.map((group) => {
      let user = listNameUser.find((user) => user.id === group.userId);
      return {
        ...group,
        displayName: `${user.firstName} ${user.lastName}`,
      };
    });

    let formatGroupBaseUser = await this.dataService.find(GroupChat, {
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

    return await formatGroupBaseUser.map((listGroup) => {
      let getName = listDisplayName.find(
        (user) => user.groupId === listGroup.id,
      );
      return {
        ...listGroup,
        groupName: getName.displayName,
      };
    });
  }

  async updateUserGroupChat(id: string, entities: GroupDto): Promise<any> {
    const modifiedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const all_group_id = await this.dataService.update(GroupChat, id, {
      ...entities,
      modifiedAt,
    });
    return all_group_id;
  }
}
