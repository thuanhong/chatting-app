import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DataModule } from '@src/libs/services/data.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import Controllers
import { CheckHealthController } from '@src/api/check-health/check-health.controller';
import { GroupController } from '@src/api/group/group.controller';
import { SignUpController } from '@src/api/sign-up/sign-up.controller';
import { UserController } from '@src/api/user/user.controller';
import { ChatController } from '@src/api/chat/chat.controller';

// Import Services
import { CheckHealthService } from '@src/api/check-health/check-health.service';
import { GroupService } from '@src/api/group/group.service';
import { SignUpService } from '@src/api/sign-up/sign-up.service';
import { UserService } from '@src/api/user/user.service';
import { ChatService } from '@src/api/chat/chat.service';

import { AuthMiddleware } from './middleware/auth.middleware';
import { ChatGateway } from '@src/api/chat/chat.gateway';

@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot({
      // envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [
    CheckHealthController,
    GroupController,
    SignUpController,
    UserController,
    ChatController,
  ],
  providers: [
    CheckHealthService,
    GroupService,
    SignUpService,
    UserService,
    ChatGateway,
    ChatService,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/api/v1/group-chat/:id', '/auth/sign-up', '/api/v1/message/:id')
      .forRoutes({ path: '/api/v1', method: RequestMethod.ALL });
    // consumer.apply(AuthMiddleware).exclude('/api/check-health').forRoutes();
  }
}
