import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
    },
  });
}

export function createCachingQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 60_000,
        staleTime: 60_000,
      },
    },
  });
}

export function renderInRouter(
  ui: ReactElement,
  queryClient: QueryClient,
  path = '/main/1',
  routePath = '/main/:page/:detailsId?'
) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={routePath} element={ui} />
          <Route path="/main" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
