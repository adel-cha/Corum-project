import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">My App</h1>
      <button
        onClick={logout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};
