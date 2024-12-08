import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
  </Routes>
);
