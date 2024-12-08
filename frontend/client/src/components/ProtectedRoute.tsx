// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  // Vérifiez si l'utilisateur est authentifié
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Rendre les enfants si l'utilisateur est authentifié
};

export default ProtectedRoute;
