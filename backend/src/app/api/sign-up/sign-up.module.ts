import { Module } from '@nestjs/common';
import { UserController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { DataModule } from '@src/services/data.module';

@Module({
  imports: [DataModule],
  controllers: [UserController],
  providers: [SignUpService],
})
export class SignUpModule {}
