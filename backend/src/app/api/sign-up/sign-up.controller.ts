import {
  Controller,
  Post,
  Body,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserResponse } from '@src/response/create-user.response';
import { SignUpService } from './sign-up.service';
import { BaseRequest } from '@src/libs/common/core';
import { UserToken } from '@src/interface/user-token-info.interface';

@Controller('/auth/sign-up')
export class SignUpController {
  constructor(private signUpService: SignUpService) {}
  private readonly logger = new Logger(SignUpController.name);

  @Post()
  async saveUser(
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
