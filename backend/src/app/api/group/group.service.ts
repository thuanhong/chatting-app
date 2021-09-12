import { Injectable } from '@nestjs/common';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/libs/entities/user-group.entity';
import { DataService } from '@src/services/data.service';
import { In } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(private dataService: DataService) {}
  async getUserGroupChat(userId: string): Promise<GroupChat[]> {
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
    });
  }
}
