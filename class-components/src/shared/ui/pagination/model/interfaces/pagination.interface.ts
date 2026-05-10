export interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
  readonly onPageChange: (page: number) => void;
  readonly count: number;
}
