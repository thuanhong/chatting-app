import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  constructor(private chatService: ChatService) {}

  private connectedUsers = [];

  private logger: Logger = new Logger('ChatGateway');

  afterInit() {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { senderId: string; groupId: string; content: string },
  ) {
    this.chatService.saveMessageByGroupId(
      message.groupId,
      message.content,
      message.senderId,
    );
    this.wss.to(message.groupId).emit('chatToClient', message);
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

  // @SubscribeMessage('connectionCall')
  // connectCalling(client: Socket, room: string) {
  //   client.join(room);
  //   client.emit('joinedRoom', room);
  // }
  @SubscribeMessage('connection')
  offer(client: Socket) {
    this.connectedUsers.push(client.id);
    const otherUsers = this.connectedUsers.filter(
      (socketId) => socketId !== client.id,
    );

    // Remove client when socket is disconnected
    client.on('disconnect', () => {
      this.connectedUsers = this.connectedUsers.filter(
        (socketId) => socketId !== client.id,
      );
    });
  }

  @SubscribeMessage('call-user')
  public callUser(client: Socket, data: any): void {
    client.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: client.id,
    });
  }

  @SubscribeMessage('make-answer')
  public makeAnswer(client: Socket, data: any): void {
    client.to(data.to).emit('answer-made', {
      socket: client.id,
      answer: data.answer,
    });
  }

  @SubscribeMessage('reject-call')
  public rejectCall(client: Socket, data: any): void {
    client.to(data.from).emit('call-rejected', {
      socket: client.id,
    });
  }
}
