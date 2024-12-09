import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import EditUser from './pages/user/EditUser';
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
    <Route
      path="/edit/:id"
      element={
        <ProtectedRoute>
          <EditUser />
        </ProtectedRoute>
      }
    />
    <Route
      path="/create"
      element={
        <ProtectedRoute>
          <EditUser />
        </ProtectedRoute>
      }
    />
  </Routes>
);
