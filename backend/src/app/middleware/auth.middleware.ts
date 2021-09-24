import { HttpStatus, Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';
import { FirebaseAuthService } from '@src/libs/data/services/firebase.service';
import * as CONSTANT from '@src/app/constants.api';

export interface RequestModel extends Request {
  user: any;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseAuthService) {}
  private readonly logger = new Logger(AuthMiddleware.name);

  public async use(req: RequestModel, _: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new HttpException(
          { message: CONSTANT.MISSING_AUTH_HEADER },
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.firebaseService.authenticate(authorization);
      req.user = user;

      next();
    } catch (err) {
      throw new HttpException(
        { message: CONSTANT.INVALID_AUTH_TOKEN },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
