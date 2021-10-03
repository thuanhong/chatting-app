import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataService } from './data.service';
import { FirebaseAuthService } from './firebase.service';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';

@Module({
  providers: [
    DataService,
    FirebaseAuthService,
    NotificationService,
    NotificationGateway,
  ],
  exports: [DataService, FirebaseAuthService, NotificationService],
  imports: [ConfigModule],
})
export class DataModule {}
