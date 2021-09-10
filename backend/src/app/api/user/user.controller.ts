import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Logger,
  Request,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
import { UserReponse } from '@src/libs/common/response/user.response';
import { UserIdReponse } from '@src/response/user-id.response';
import { CreateUserResponse } from '@src/response/create-user.response';
import { CreateUserRequest } from '@src/request/create-user.request';
import { UserService } from './user.service';
import { RequestModel } from '@src/app/middleware/auth.middleware';
import { UserEmailReponse } from '@src/libs/common/response/user-email.response';
import { UserDto } from '@src/libs/common/dto/user.dto';

@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}
  private readonly logger = new Logger(UserController.name);
  @HttpCode(200)
  @Get()
  async getUsers(@Param() req: RequestModel): Promise<UserReponse> {
    const users = await this.userService.getUsers();
    console.log(req);
    return new UserReponse({
      users,
    });
  }

  // @Get(':id')
  // async getUserById(
  //   @Param('id', ParseUUIDPipe) id: string,
  // ): Promise<UserIdReponse> {
  //   const user = await this.userService.getUserById(id);
  //   return new UserIdReponse({
  //     user,
  //   });
  // }

  @Post()
  @HttpCode(200)
  async saveUser(
    @Request() req: any,
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    console.log('im here');

    request.payload[0].email = req.user.email;
    const data = await this.userService.saveUser(...request.payload);
    return new CreateUserResponse({
      message: 'success',
    });
  }

  @Get('info')
  @HttpCode(200)
  async getUserByEmail(@Request() req: RequestModel): Promise<any> {
    const email = req.user.email;
    const data = await this.userService.getUserByEmail(email);
    const fullName = req.user.name.split(' ');
    const firstName = fullName[0]
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const lastName = fullName[fullName.length - 1]
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (data === undefined || data === null) {
      const User: UserDto = {
        id: req.user.uid,
        email: req.user.email,
        firstName: firstName,
        lastName: lastName,
        middleName: '',
        isOnline: false,
      };

      const saveUser = await this.userService.saveUser(User);
      if (saveUser === undefined || saveUser === null) {
        throw new BadRequestException('Invalid user');
      } else {
        const data2 = await this.userService.getUserByEmail(email);
        return new UserEmailReponse({
          user: data2,
        });
      }
    }

    return new UserEmailReponse({
      user: data,
    });
  }
}
