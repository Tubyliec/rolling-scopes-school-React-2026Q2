export type PaginationProps = Readonly<{
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  count: number;
}>;
