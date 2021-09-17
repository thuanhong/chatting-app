import {
  Controller,
  Param,
  Post,
  Body,
  Logger,
  Request,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserResponse } from '@src/response/create-user.response';
import { SignUpService } from './sign-up.service';
import { BaseRequest } from '@src/libs/common/core';

export interface UserToken {
  uid: string;
  email: string;
  password: string;
  displayName: string;
}

@Controller('/auth/sign-up')
export class UserController {
  constructor(private signUpService: SignUpService) {}
  private readonly logger = new Logger(UserController.name);

  @Post()
  @HttpCode(200)
  async saveUser(
    @Request() req: any,
    @Body() userInfo: BaseRequest<UserToken>,
  ): Promise<CreateUserResponse> {
    const saveUser = await this.signUpService.saveUser(userInfo);
    if (saveUser.status === false) {
      throw new BadRequestException(
        'The email address is already in use by another account.',
      );
    }
    return new CreateUserResponse({
      message: 'success',
      data: saveUser,
    });
  }
}
