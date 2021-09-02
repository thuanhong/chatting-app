import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import * as admin from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';
import { FirebaseParams } from '@src/interface/firebase-params.interface';

const firebase_params: FirebaseParams = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
};

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  admin.initializeApp({ credential: admin.credential.cert(firebase_params) });
  const options = new DocumentBuilder()
    .setTitle('Backend Service')
    .setDescription('Chatting App Backend Service.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );

  await app.listen(parseInt(process.env.SERVER_PORT, 10) || 8000, '0.0.0.0');
}
export default admin;
bootstrap();
