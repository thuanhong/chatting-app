import { Injectable } from '@nestjs/common';
import { GroupChat } from '@src/entities/group-chat.entity';
import { UserGroup } from '@src/libs/entities/user-group.entity';
import { DataService } from '@src/libs/services/data.service';
import { In, Not } from 'typeorm';
import { PagingInfo } from '@src/interface/paging-info.interface';
import { GroupDto } from '@src/libs/common/dto/group.dto';
import { Contact } from '@src/libs/entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(private dataService: DataService) {}
  async getListContactUser(
    userId: string,
    pageInfo: PagingInfo,
  ): Promise<Contact[]> {
    return await this.dataService.find(Contact, {
      select: ['id', 'contactId', 'userId', 'type'],
      where: {
        userId: userId,
      },
    });
  }
}
