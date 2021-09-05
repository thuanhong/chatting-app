import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserReponse } from '@src/libs/common/response/user.response';
import { UserIdReponse } from '@src/response/user-id.response';
import { CreateUserResponse } from '@src/response/create-user.response';
import { CreateUserRequest } from '@src/request/create-user.request';
import { UserService } from './user.service';

@ApiTags('Check Health')
@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserReponse> {
    const users = await this.userService.getUsers();
    return new UserReponse({
      users,
    });
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserIdReponse> {
    const user = await this.userService.getUserById(id);
    return new UserIdReponse({
      user,
    });
  }

  @Post()
  async saveUser(
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const data = await this.userService.saveUser(...request.payload);
    return new CreateUserResponse({
      token:
        'GGDuGEV8WshwlfIvntyFxOlSlrvsrxqvCFvnleSW0Al1s6RK4YSd6tSdNBo7Wcn9cLackLKOyMScDd4isIhH4fI1uaJpDyOE', // NEED TO WORK
      user: data[0],
    });
  }
}
