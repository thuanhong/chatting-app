import { Injectable } from '@nestjs/common';
import { DataService } from '@src/services/data.service';
import { Users } from '@src/entities/users.entity';
import { UserDto } from '@src/dto/user.dto';

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

  async saveUser(...entities: UserDto[]): Promise<UserDto[]> {
    console.log(entities)
    const data = await this.dataService.save(Users, ...entities);
    return data;
  }
}
