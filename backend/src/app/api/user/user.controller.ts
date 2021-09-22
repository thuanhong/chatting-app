import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Request,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { MultipleUserResponse } from '@src/response/multiple-user.response';
import { CreateUserResponse } from '@src/response/create-user.response';
import { CreateUserRequest } from '@src/request/create-user.request';
import { UserService } from './user.service';
import { RequestModel } from '@src/app/middleware/auth.middleware';
import { UserEmailReponse } from '@src/response/user-email.response';
import { UserDto } from '@src/dto/user.dto';
import { SearchUserWithEmailRequest } from '@src/request/search-user-with-email.request';
import { AddNewContactRequest } from '@src/request/add-new-contact.request';
import { AddNewContactResponse } from '@src/response/add-new-contact.response';

@Controller('/api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Post()
  async saveUser(
    @Request() req: any,
    @Body() request: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    request.payload[0].email = req.user.email;
    await this.userService.saveUser(...request.payload);
    return new CreateUserResponse({
      message: 'success',
    });
  }

  @Get('info')
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

  @Get('contact')
  async getAllContact(@Req() req: any): Promise<MultipleUserResponse> {
    const users = await this.userService.getAllContact(req.user.id);
    return new MultipleUserResponse({
      users,
    });
  }

  @Post('search')
  async searchUserWithEmail(
    @Body() payload: SearchUserWithEmailRequest,
  ): Promise<MultipleUserResponse> {
    const { emailString } = payload;
    const users = await this.userService.searchUserWithEmail(emailString);
    return new MultipleUserResponse({
      users,
    });
  }

  @Post('add-contact')
  async addNewContactForUser(
    @Req() req: any,
    @Body() payload: AddNewContactRequest,
  ): Promise<AddNewContactResponse> {
    const groupId = await this.userService.addNewContactUser(
      req.user.id,
      payload.contactId,
    );
    return new AddNewContactResponse({
      groupId,
    });
  }
}
