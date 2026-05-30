import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app.tsx';
import ErrorBoundary from '@/core/error-boundary/error-boundary.tsx';
import { ThemeProvider } from '@/core/theme/theme-context.tsx';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root element #root not found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
