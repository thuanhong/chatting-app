import { Injectable } from '@nestjs/common';
import { DataService } from '@src/services/data.service';
import { Users } from '@src/entities/users.entity';
import { Contact } from '@src/entities/contact.entity';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/entities/user-group.entity';
import { UserDto } from '@src/dto/user.dto';
import { In, Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private dataService: DataService) {}
  async getUsers(): Promise<Users[]> {
    return await this.dataService.find(Users, {});
  }

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

  async searchUserWithEmail(userInput: string): Promise<Users[]> {
    const data = await this.dataService.find(Users, {
      where: {
        email: Like(`%${userInput}%`),
      },
    });
    return data;
  }

  async checkContactExist(userId: string, contactId: string): Promise<boolean> {
    const checkContactExist = await this.dataService.find(Contact, {
      select: ['user_id', 'contact'],
      where: {
        userId,
        contactId,
      },
    });
    return checkContactExist.length > 0;
  }

  async addNewContactUser(userId: string, contactId: string): Promise<string> {
    const newContacts = [
      Object.assign(new Contact(), {
        userId,
        contact: contactId,
      }),
      Object.assign(new Contact(), {
        userId: contactId,
        contact: userId,
      }),
    ];
    const newGroupChatId = this.dataService.generateId();

    const groupChat = Object.assign(new GroupChat(), {
      id: newGroupChatId,
      groupName: 'Chatting',
      lastMessage: '',
    });

    await Promise.all([
      this.dataService.insert(Contact, ...newContacts),
      this.dataService.insert(GroupChat, groupChat),
    ]);

    const newUserGroups = [
      Object.assign(new UserGroup(), {
        userId,
        groupId: newGroupChatId,
        isActive: true,
      }),
      Object.assign(new UserGroup(), {
        contactId,
        groupId: newGroupChatId,
        isActive: true,
      }),
    ];

    await this.dataService.insert(UserGroup, ...newUserGroups);
    return newGroupChatId;
  }
}
