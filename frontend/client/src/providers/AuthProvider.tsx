import { useEffect, createContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types/user';

export interface AuthContextType {
  user: User | null; // Utilisez User ou null
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Créez le contexte avec une valeur par défaut
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        if (isTokenExpired(token)) {
          localStorage.removeItem('token'); // Enlevez le token expiré
        } else {
          const decodedUser: User = jwtDecode(token);
          if (decodedUser.active) setUser(decodedUser);
        }
      } catch (error) {
        console.error('Invalid token', error);
        localStorage.removeItem('token'); // Enlevez le token invalide
      }
    }
  }, []);
  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isTokenExpired = (token: string): boolean => {
    const decoded: { exp: number } = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000; // Convertit exp en millisecondes
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
