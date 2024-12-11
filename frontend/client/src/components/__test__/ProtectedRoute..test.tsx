// src/components/ProtectedRoute.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { AuthProvider } from '../../providers/AuthProvider'; // Assurez-vous d'importer le AuthProvider
import { useAuth } from '../../hooks/useAuth';
import { faker } from '@faker-js/faker';

// Création d'un mock pour le hook useAuth
vi.mock('../../hooks/useAuth');

describe('ProtectedRoute', () => {
  it('should redirect to /login if user is not authenticated', () => {
    // Mock de l'authentification de l'utilisateur
    const useAuthMock = vi.mocked(useAuth);
    useAuthMock.mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </AuthProvider>,
    );

    // Vérifiez que le contenu protégé n'est pas rendu
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children if user is authenticated', () => {
    // Mock de l'authentification de l'utilisateur
    const useAuthMock = vi.mocked(useAuth);
    useAuthMock.mockReturnValue({
      user: {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        birthDate: faker.date.birthdate(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        active: true,
      },
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/protected']}>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </AuthProvider>,
    );

    // Vérifiez que le contenu protégé est rendu
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
