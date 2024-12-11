import React from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { MemoryRouter } from 'react-router-dom';
import { User } from '#types/user';

export const renderWithAuthAndRouter = (
  ui: React.ReactNode,
  {
    user,
    logout = vi.fn(),
    login = vi.fn(),
  }: { user: User; login?: () => void; logout?: () => void },
) => {
  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>
  );
};
