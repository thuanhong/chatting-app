import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DataModule } from '@src/services/data.module';
import { ConfigModule } from '@nestjs/config';
// Import Controllers
import { CheckHealthController } from '@src/api/check-health/check-health.controller';

// Import Services
import { FirebaseAuthService } from '@src/services/firebase.service';
import { CheckHealthService } from '@src/api/check-health/check-health.service';

import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    DataModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [CheckHealthController],
  providers: [FirebaseAuthService, CheckHealthService],
  exports: [FirebaseAuthService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/api/v1', method: RequestMethod.ALL });
  }
}
