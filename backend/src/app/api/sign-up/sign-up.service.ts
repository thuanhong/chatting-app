import { Injectable } from '@nestjs/common';
import { DataService } from '@src/services/data.service';
import { Users } from '@src/entities/users.entity';
import { UserDto } from '@src/dto/user.dto';
import { In } from 'typeorm';
import admin from '@src/main';

@Injectable()
export class SignUpService {
  constructor(private dataService: DataService) {}

  async saveUser(...entities: any): Promise<any> {
    try {
      const data = await admin.auth().createUser(entities[0]);
      return data;
    } catch (e) {
      return { status: false, message: e };
    }
  }
}
