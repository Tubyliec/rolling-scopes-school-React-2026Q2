import { useRouter, useSearchParams } from 'next/navigation';

import { useLocale } from 'next-intl';

export function usePaginationNavigation(currentPage: number) {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`/${locale}?${params.toString()}`);
  };

  const handlePrevious = (): void => {
    navigateToPage(currentPage - 1);
  };

  const handleNext = (): void => {
    navigateToPage(currentPage + 1);
  };

  const handlePageClick = (page: number): void => {
    const isSamePage = page === currentPage;
    if (!isSamePage) {
      navigateToPage(page);
    }
  };

  return {
    handlePrevious,
    handleNext,
    handlePageClick,
  };
}
