import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app.tsx';
import ErrorBoundary from '@/core/error-boundary/error-boundary.tsx';
import { queryClient } from '@/core/query/query-client.ts';
import { QueryClientProvider } from '@tanstack/react-query';

import './index.scss';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root element #root not found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
