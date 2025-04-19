type props<T> = {
  data: T[];
  page?: number;
  pageSize?: number;
  total: number;
};

export type PaginatorObjectType<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  length: number;
};

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PAGE_SIZE = 10;

class Paginator<T> {
  data: T[];
  page?: number;
  pageSize?: number;
  total: number;

  constructor({
    data,
    page = DEFAULT_PAGE_NUM,
    pageSize = DEFAULT_PAGE_SIZE,
    total,
  }: props<T>) {
    this.data = data;
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
  }

  toObject(): PaginatorObjectType<T> {
    return {
      data: this.data,
      page: this.page || DEFAULT_PAGE_NUM,
      pageSize: this.pageSize || DEFAULT_PAGE_SIZE,
      total: this.total,
      length: this.total,
    };
  }
}

export default Paginator;
