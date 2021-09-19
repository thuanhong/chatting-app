import { Injectable } from '@nestjs/common';
import { DataService } from '@src/services/data.service';
import { Users } from '@src/entities/users.entity';
import { Contact } from '@src/entities/contact.entity';
import { UserDto } from '@src/dto/user.dto';
import { In } from 'typeorm';

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
        id: In(all_contact_id.map((contact) => contact.contact)),
      },
    });
  }
}
