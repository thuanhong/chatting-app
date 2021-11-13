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

  private activeSockets: { room: string; id: string; userId: string }[] = [];

  @SubscribeMessage('joinRoom')
  public joinRoom(
    client: Socket,
    data: { rooms: string; userId: string },
  ): void {
    client.join(data.rooms);
    client.emit('joinedRoom', data.rooms);

    const existingSocket = this.activeSockets?.find(
      (socket) => socket.room === data.rooms && socket.id === client.id,
    );

    if (!existingSocket) {
      this.activeSockets = [
        ...this.activeSockets,
        { id: client.id, room: data.rooms, userId: data.userId },
      ];
      client.emit(`${data.rooms}-update-user-list`, {
        users: this.activeSockets
          .filter(
            (socket) =>
              socket.room === data.rooms &&
              socket.id !== client.id &&
              data.userId !== socket.userId,
          )
          .map((existingSocket) => existingSocket.id),
      });

      client.broadcast.emit(`${data.rooms}-update-user-list`, {
        users: [client.id],
      });
    }

    return this.logger.log(
      `Client ${client.id} joined video call ${data.rooms}`,
    );
  }

  @SubscribeMessage('call-user')
  public callUser(client: Socket, data: any): void {
    // console.log('call-user', data);
    const socketSender = this.activeSockets.find(
      (x) => x.userId == data.userId,
    );
    const socketAnswer = this.activeSockets.find((x) => x.id == client.id);
    console.log('activeSocket', this.activeSockets);
    console.log('data.userId', data.userId);
    console.log('socketSender', socketSender);
    console.log('offer', data.offer);
    client.to(socketSender.id).emit('call-made', {
      offer: data.offer,
      socket: client.id,
      candidate: data.candidate,
    });
    this.logger.log(
      `Client make -answer: ${client.id + data.offer + socketSender.id}`,
    );
  }

  @SubscribeMessage('make-answer')
  public makeAnswer(client: Socket, data: any): void {
    console.log('make-answer', data);
    const socketAnswer = this.activeSockets.find((x) => x.id == client.id);
    console.log('socketAnswer', socketAnswer);
    client.to(data.to).emit('answer-made', {
      userId: socketAnswer.userId,
      answer: data.answer,
    });
    this.logger.log(`Client make -answer: ${client.id + data.to}`);
  }

  @SubscribeMessage('make-stop-call')
  public makeStopCall(client: Socket, to: string): void {
    const socketAnswer = this.activeSockets.find((x) => x.userId === to);
    client.to(socketAnswer.id).emit('stop-call', 'stop');
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
