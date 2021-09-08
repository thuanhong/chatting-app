import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataModule } from '@src/services/data.module';

@Module({
    imports:[DataModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}