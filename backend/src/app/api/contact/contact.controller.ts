import {
  Controller,
  Logger,
  Get,
  Req,
  Query,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from '@src/libs/entities/contact.entity';
import { PagingInfo } from '@src/libs/interface/paging-info.interface';
@Controller('/api/v1/contact')
export class ContactController {
  constructor(private contactService: ContactService) {}
  private readonly logger = new Logger(ContactController.name);

  @Get('')
  async getListContactUser(
    @Req() req,
    @Query() query: PagingInfo,
  ): Promise<any> {
    return await this.contactService.getListContactUser(req.user.uid, query);
  }
}
