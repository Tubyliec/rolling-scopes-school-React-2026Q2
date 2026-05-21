import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app.tsx';

import ErrorBoundary from '@/core/error-boundary/error-boundary.tsx';

import './index.scss';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root element #root not found in the document.');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
