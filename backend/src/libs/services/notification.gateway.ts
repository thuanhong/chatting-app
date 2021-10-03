import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';

@WebSocketGateway({ namespace: '/notification', cors: true })
export class NotificationGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  constructor(private notificationService: NotificationService) {}

  private logger: Logger = new Logger('NotificationGateway');

  afterInit(server: Server) {
    this.notificationService.socket = server;
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
