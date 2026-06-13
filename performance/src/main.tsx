import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/app/app';

import './index.css';
import { scan } from 'react-scan';

scan({
  enabled: false,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
