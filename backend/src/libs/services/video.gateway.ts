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
import { UserService } from '@src/app/api/user/user.service';

@WebSocketGateway({ namespace: '/video', cors: true })
export class VideoGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('VideoGateway');
  constructor(private userService: UserService) {}
  private activeSockets: {
    room: string;
    id: string;
    userId: string;
    userName: string;
  }[] = [];
  @SubscribeMessage('joinRoom')
  public async joinRoom(
    client: Socket,
    data: { rooms: string; userId: string },
  ): Promise<void> {
    // client.join(data.userId);
    // client.emit('joinedRoom', data.rooms);

    const existingSocket = this.activeSockets?.find(
      (socket) => socket.room === data.rooms && socket.id === client.id,
    );

    if (!existingSocket) {
      const userName = await this.userService
        .getUserById(data.userId)
        .then((e) => `${e.firstName} ${e.lastName}`);
      this.activeSockets = [
        ...this.activeSockets,
        {
          id: client.id,
          room: data.rooms,
          userId: data.userId,
          userName: userName,
        },
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

  @SubscribeMessage('call')
  public sendCall(client: Socket, data: any): void {
    console.log('activeSocket', this.activeSockets);
    const socketSender = this.activeSockets.find(
      (x) => x.userId == data.userId,
    );
    const socketAnswer = this.activeSockets.find((x) => x.id == client.id);
    this.logger.log(`Client pick-up: ${socketAnswer.userName}`);
    console.log('socketAnswer', socketAnswer);
    client.to(socketSender.id).emit('pick-up', {
      socketId: client.id,
      userId: socketAnswer.userId,
      userName: socketAnswer.userName,
    });
  }

  @SubscribeMessage('offer')
  public offerRequest(client: Socket, data: any): void {
    this.logger.log(`OFFER socketId ${data.socketId}`);
    console.log('descriptiondescription', data.description);
    client
      .to(data.socketId)
      .emit('offer', { socketId: client.id, description: data.description });
  }

  @SubscribeMessage('answer')
  public answer(client: Socket, data: any): void {
    this.logger.log('ANSWER');
    console.log('answer', data);
    const socketAnswer = this.activeSockets.find((x) => x.id == client.id);

    client.to(data.socketId).emit('answer', {
      description: data.description,
      userId: socketAnswer.userId,
    });
  }

  @SubscribeMessage('candidate')
  public setCandidate(client: Socket, data: any): void {
    this.logger.log(`CANDIATE ${data.socketId}`);

    client.to(data.socketId).emit('candidate', data.candidate);
  }

  @SubscribeMessage('other-users')
  public callOther(client: Socket, userId: string): void {
    const socketSender = this.activeSockets.find((x) => x.userId == userId);
    console.log('socket current', this.activeSockets);
    this.logger.log('otherUser', socketSender.id, ' TAI ', client.id);
    client.to(socketSender.id).emit('other-users', client.id);
  }

  @SubscribeMessage('call-user')
  public callUser(client: Socket, data: any): void {
    // console.log('call-user', data);
    const socketSender = this.activeSockets.find(
      (x) => x.userId == data.userId,
    );
    const socketAnswer = this.activeSockets.find((x) => x.id == client.id);

    client.to(socketSender.id).emit('call-made', {
      offer: data.offer,
      socket: client.id,
      userId: socketAnswer.userId,
      userName: socketAnswer.userName,
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
    const socketAnswer = this.activeSockets.find((x) => x.id === client.id);
    this.logger.log(`REJCT ${data}`);
    console.log('REJCT', data);
    client.to(data.from).emit('call-rejected', {
      userName: socketAnswer.userName || 'Your friend',
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
