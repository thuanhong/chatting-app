import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { Notification } from '@src/entities/notification.entity';
import { NotificationDto } from '@src/dto/notification.dto';
import { DataService } from './data.service';

@Injectable()
export class NotificationService {
  public socket: Server = null;
  constructor(private dataService: DataService) {}

  async saveNewNotification(
    userId: string,
    contactId: string,
    notifyDesc: string,
  ): Promise<void> {
    const newNotification: NotificationDto = {
      userId: contactId,
      notifyType: '',
      notifyDesc,
      status: true,
    };
    await this.dataService.save(Notification, newNotification);

    this.socket.to(userId).to(contactId).emit('chatToClient', '');
  }
}
