import { QueryClient } from '@tanstack/react-query';

const ttl = parseInt(process.env.CACHE_TTL ?? '300000', 10);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ttl,
      gcTime: ttl * 2,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
