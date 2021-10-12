import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ namespace: '/call', cors: true })
export class VideoCallGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('VideoCallGateway');

  private activeSockets: { room: string; id: string }[] = [];

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    client.join(room);
    client.emit('joinedRoom', room);

    const existingSocket = this.activeSockets?.find(
      (socket) => socket.room === room && socket.id === client.id,
    );

    if (!existingSocket) {
      this.activeSockets = [...this.activeSockets, { id: client.id, room }];
      client.emit(`${room}-update-user-list`, {
        users: this.activeSockets
          .filter((socket) => socket.room === room && socket.id !== client.id)
          .map((existingSocket) => existingSocket.id),
      });

      client.broadcast.emit(`${room}-update-user-list`, {
        users: [client.id],
      });
    }

    return this.logger.log(`Client ${client.id} joined video call ${room}`);
  }

  @SubscribeMessage('call-user')
  public callUser(client: Socket, data: any): void {
    console.log('call-user', data);
    client.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: client.id,
    });
    this.logger.log(`Client make -answer: ${client.id + data.offer + data.to}`);
  }

  @SubscribeMessage('make-answer')
  public makeAnswer(client: Socket, data: any): void {
    console.log('make-answer', data);

    client.to(data.to).emit('answer-made', {
      socket: client.id,
      answer: data.answer,
    });
    this.logger.log(`Client make -answer: ${client.id + data.to}`);
  }

  @SubscribeMessage('reject-call')
  public rejectCall(client: Socket, data: any): void {
    client.to(data.from).emit('call-rejected', {
      socket: client.id,
    });
  }
  public afterInit(server: Server): void {
    this.logger.log('Init');
  }
  public handleDisconnect(client: Socket): void {
    const existingSocket = this.activeSockets.find(
      (socket) => socket.id === client.id,
    );

    if (!existingSocket) return;

    this.activeSockets = this.activeSockets.filter(
      (socket) => socket.id !== client.id,
    );

    client.broadcast.emit(`${existingSocket.room}-remove-user`, {
      socketId: client.id,
    });

    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
