import { Injectable } from '@nestjs/common';
import { DataService } from '@src/libs/services/data.service';
import { Users } from '@src/entities/users.entity';
import { Contact } from '@src/entities/contact.entity';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/entities/user-group.entity';
import { UserDto } from '@src/dto/user.dto';
import { ContactDto } from '@src/dto/contact.dto';
import { GroupDto } from '@src/dto/group.dto';
import { UserGroupDto } from '@src/dto/user-group.dto';
import { In, Like, Not } from 'typeorm';
import { AddNewContactRequest } from '@src/request/add-new-contact.request';
import { NotificationService } from '@src/services/notification.service';
import { CheckContactResponse } from '@src/response/check-contact.response';

@Injectable()
export class UserService {
  constructor(
    private dataService: DataService,
    private notificationService: NotificationService,
  ) {}

  async getUserById(id: string): Promise<Users> {
    return await this.dataService.firstOrDefault(Users, {
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<Users> {
    return await this.dataService.firstOrDefault(Users, {
      where: {
        email,
      },
    });
  }

  async saveUser(...entities: UserDto[]): Promise<UserDto[]> {
    const data = await this.dataService.save(Users, ...entities);
    return data;
  }

  async getAllContact(userId: string): Promise<Users[]> {
    const all_contact_id = await this.dataService.find(Contact, {
      select: ['contact'],
      where: {
        userId: userId,
      },
    });

    return await this.dataService.find(Users, {
      select: ['id', 'email', 'firstName', 'lastName', 'isOnline'],
      where: {
        id: In(all_contact_id.map((contact) => contact.contactId)),
      },
    });
  }

  async searchUserWithEmail(
    userId: string,
    userInput: string,
  ): Promise<Users[]> {
    const data = await this.dataService.find(Users, {
      where: {
        email: Like(`%${userInput}%`),
        id: Not(userId),
      },
    });
    return data;
  }

  async checkContactExist(
    userId: string,
    contactId: string,
  ): Promise<CheckContactResponse[]> {
    const checkContactExist = await (
      await this.dataService.asQuery(UserGroup, 'userGroup')
    )
      .select('COUNT(userGroup.group_id)', 'count')
      .addSelect('userGroup.group_id', 'groupId')
      .where('userGroup.user_id = :userId', { userId })
      .orWhere('userGroup.user_id = :contactId', { contactId })
      .groupBy('userGroup.group_id')
      .having('count > 1')
      .getRawMany();
    return checkContactExist;
  }

  async addNewContactUser(
    userId: string,
    payload: AddNewContactRequest,
  ): Promise<string> {
    const { contactId, firstName, lastName } = payload;
    const newContacts = [
      {
        userId,
        contactId: contactId,
      } as ContactDto,
      {
        userId: contactId,
        contactId: userId,
      } as ContactDto,
    ];
    const newGroupChatId = this.dataService.generateId();
    const userContact = await this.getUserById(userId);

    const groupChat: GroupDto = {
      id: newGroupChatId,
      groupName: `${userId}-${firstName} ${lastName}-${userContact.firstName} ${userContact.lastName}`,
      lastMessage: '',
    };

    await Promise.all([
      this.dataService.save(Contact, ...newContacts),
      this.dataService.save(GroupChat, groupChat),
    ]);

    const newUserGroups = [
      {
        userId,
        groupId: newGroupChatId,
        isActive: true,
      } as UserGroupDto,
      {
        userId: contactId,
        groupId: newGroupChatId,
        isActive: true,
      } as UserGroupDto,
    ];

    await this.dataService.save(UserGroup, ...newUserGroups);
    const notifyDesc = `${userContact.firstName} ${userContact.lastName} want to contact with you`;
    this.notificationService.saveNewNotification(userId, contactId, notifyDesc);
    return newGroupChatId;
  }
}
