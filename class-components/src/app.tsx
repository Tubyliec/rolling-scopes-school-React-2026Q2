import { type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/main/main-page.tsx';
import PersonDetail from './entities/person/ui/details/person-details.tsx';
import AboutPage from './pages/about/about-page.tsx';
import NotFoundPage from './pages/not-found/not-found-page.tsx';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/main" replace />} />
      <Route path="/main" element={<MainPage />}>
        <Route path=":detailsId" element={<PersonDetail />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
