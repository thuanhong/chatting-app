import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DataModule } from '@src/services/data.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// Import Controllers
import { CheckHealthController } from '@src/api/check-health/check-health.controller';
import { UserController } from '@src/api/user/user.controller';

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
  ],
  controllers: [CheckHealthController],
  providers: [CheckHealthService],
  exports: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('/api/check-health').forRoutes();
  }
}
