import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import ErrorBoundary from '@/core/error-boundary/error-boundary.tsx';
import { queryClient } from '@/core/query/query-client.ts';
import AppRouter from '@core/router/app-router.tsx';
import { ThemeProvider } from '@core/theme/theme-context.tsx';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.scss';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root element #root not found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
