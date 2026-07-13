export type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  count: number;
}>;
