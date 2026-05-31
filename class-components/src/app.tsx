import { type JSX } from 'react';

import AppRouter from '@core/router/app-router.tsx';

import { ThemeProvider } from '@/core/theme/theme-context.tsx';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
