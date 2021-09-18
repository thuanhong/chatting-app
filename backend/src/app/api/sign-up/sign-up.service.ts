import { Injectable } from '@nestjs/common';
import { DataService } from '@src/services/data.service';
import { UserToken } from '@src/interface/user-token-info.interface';

import admin from '@src/main';

@Injectable()
export class SignUpService {
  constructor(private dataService: DataService) {}

  async saveUser(entities: UserToken): Promise<any> {
    try {
      const data = await admin.auth().createUser(entities);
      return data;
    } catch (e) {
      return { status: false, message: e };
    }
  }
}
