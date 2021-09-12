import { BaseDto } from '@src/dto/base.dto';

export class PageDto extends BaseDto<PageDto> {
  orderBy?: string;
  direct?: 'ASC' | 'DESC';
  pageIndex?: number;
  isEnd?: boolean;
}
