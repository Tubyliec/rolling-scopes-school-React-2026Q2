import { type JSX } from 'react';

import { ThemeProvider } from '@/core/theme/theme-context.tsx';
import AppRouter from '@core/router/app-router.tsx';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
