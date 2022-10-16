export type PaginatedApiResponseType<T> = {
  data: T;
  meta: {
    count: number;
    totalPage: number;
    page: number;
  };
};
