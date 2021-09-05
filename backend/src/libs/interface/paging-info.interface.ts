export interface PagingInfo {
  orderBy?: string;
  direct?: 'ASC' | 'DESC';
  pageIndex?: number;
  isEnd?: boolean;
  take?: number;
  total?: number;
}
