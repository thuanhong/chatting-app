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
import { GroupController } from '@src/api/group/group.controller';

//import Module
import { UserModule } from '@src/api/user/user.module';

// Import Services
import { CheckHealthService } from '@src/api/check-health/check-health.service';
import { GroupService } from '@src/api/group/group.service';

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
  ],
  controllers: [CheckHealthController, GroupController],
  providers: [CheckHealthService, GroupService],
  exports: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude('/api/check-health')
    //   .forRoutes({ path: '/api/v1', method: RequestMethod.ALL });
    consumer.apply(AuthMiddleware).exclude('/api/check-health').forRoutes();
  }
}
