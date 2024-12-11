// src/components/__tests__/LoginForm.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LoginForm from '../LoginForm';
import { useAuth } from '../../hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import * as authService from '../../api/services/authService';
import * as userService from '../../api/services/userService';
import { faker } from '@faker-js/faker';

// Mock the useAuth hook
vi.mock('../../hooks/useAuth');
const useAuthMock = vi.mocked(useAuth);

// Mock the authService
vi.mock('../../api/services/authService', () => ({
  loginUser: vi.fn(),
}));
const loginUserMock = vi.mocked(authService.loginUser);

// Mock the userService
vi.mock('../../api/services/userService', () => ({
  getUsersById: vi.fn(),
  updateUser: vi.fn(),
}));
const getUsersByIdMock = vi.mocked(userService.getUsersById);
const updateUserMock = vi.mocked(userService.updateUser);
const MockedLoginForm = () => (
  <BrowserRouter>
    <LoginForm />
  </BrowserRouter>
);
const mockUser = {
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  birthDate: faker.date.birthdate(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  active: true,
};
describe('LoginForm', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    useAuthMock.mockReturnValue({
      user: mockUser,
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  it('renders the login form', () => {
    render(<MockedLoginForm />);

    expect(screen.getByLabelText(/adresse email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/se connecter/i)).toBeInTheDocument();
  });

  it('logs in successfully', async () => {
    const mockToken = 'mockToken';

    loginUserMock.mockResolvedValue({
      token: mockToken,
      userData: mockUser,
    });

    render(<MockedLoginForm />);

    fireEvent.change(screen.getByLabelText(/adresse email/i), {
      target: { value: 'test@domaine.com' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(authService.loginUser).toHaveBeenCalledWith(
        'test@domaine.com',
        'password123',
      );
    });
  });

  it('shows an error message on login failure', async () => {
    loginUserMock.mockRejectedValue(new Error('Login failed'));

    render(<MockedLoginForm />);

    fireEvent.change(screen.getByLabelText(/adresse email/i), {
      target: { value: 'test@domaine.com' },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText(/se connecter/i));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });

  it('allows user to create a new password', async () => {
    // User is not active
    mockUser.active = false;
    useAuthMock.mockReturnValue({
      user: mockUser,
      login: vi.fn(),
      logout: vi.fn(),
    });
    loginUserMock.mockResolvedValue({
      token: 'mockToken',
      userData: mockUser,
    });
    getUsersByIdMock.mockResolvedValue(mockUser);
    updateUserMock.mockResolvedValue({
      ...mockUser,
      active: true,
    });

    render(<MockedLoginForm />);
    expect(screen.getByTestId('newPassword')).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('newPassword'), {
      target: { value: 'newPassword123' },
    });

    fireEvent.click(screen.getByTestId('button-newPassword'));

    await waitFor(() => {
      expect(userService.updateUser).toHaveBeenCalledWith(mockUser.id, {
        ...mockUser,
        password: 'newPassword123',
        active: true,
      });
    });
  });
});
