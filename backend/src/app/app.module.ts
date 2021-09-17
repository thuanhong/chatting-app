import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DataModule } from '@src/services/data.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// Import Controllers
import { CheckHealthController } from '@src/api/check-health/check-health.controller';

//import Module
import { UserModule } from '@src/api/user/user.module';
import { SignUpModule } from '@src/api/sign-up/sign-up.module';

// Import Services
import { CheckHealthService } from '@src/api/check-health/check-health.service';

import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    SignUpModule,
  ],
  controllers: [CheckHealthController],
  providers: [CheckHealthService],
  exports: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/api/check-health', '/auth/sign-up')
      .forRoutes({ path: '/api/v1', method: RequestMethod.ALL });
    // consumer.apply(AuthMiddleware).exclude('/api/check-health').forRoutes();
  }
}
