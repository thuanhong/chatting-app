import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataService } from './data.service';
import { FirebaseAuthService } from './firebase.service';

@Module({
  providers: [DataService, FirebaseAuthService],
  exports: [DataService, FirebaseAuthService],
  imports: [ConfigModule],
})
export class DataModule {}
