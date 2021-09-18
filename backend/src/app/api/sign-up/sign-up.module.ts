import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { DataModule } from '@src/services/data.module';

@Module({
  imports: [DataModule],
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
