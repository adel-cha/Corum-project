// src/components/__tests__/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { faker } from '@faker-js/faker';
import Header from './Header';

const firstName = faker.person.firstName();
const mockUser = {
  id: faker.string.uuid(),
  firstName: firstName,
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  birthDate: faker.date.birthdate(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  active: true,
};

const mockLogout = vi.fn();
const mockLogin = vi.fn();

describe('Header component', () => {
  it('renders logo and user info when user is authenticated', () => {
    render(
      <AuthContext.Provider
        value={{ user: mockUser, login: mockLogin, logout: mockLogout }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    // Vérifie que le logo est affiché
    expect(screen.getByAltText('Logo Corum')).toBeInTheDocument();

    // Vérifie que le nom de l'utilisateur est affiché
    expect(screen.getByText(firstName)).toBeInTheDocument();
  });

  it('does not render when user is not authenticated', () => {
    render(
      <AuthContext.Provider
        value={{ user: null, logout: vi.fn(), login: mockLogin }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    // Vérifie que rien n'est rendu
    expect(screen.queryByAltText('Logo Corum')).not.toBeInTheDocument();
    expect(screen.queryByText(firstName)).not.toBeInTheDocument();
  });

  it('toggles dropdown on button click', () => {
    render(
      <AuthContext.Provider
        value={{ user: mockUser, logout: mockLogout, login: mockLogin }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    // Clique sur le bouton pour ouvrir le menu déroulant
    const dropdownButton = screen.getByTestId('user-toggle');
    fireEvent.click(dropdownButton);

    // Vérifie que le menu déroulant est visible
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Déconnexion')).toBeInTheDocument();

    // Clique sur le bouton pour fermer le menu déroulant
    fireEvent.click(dropdownButton);
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('calls logout function on logout button click', () => {
    render(
      <AuthContext.Provider
        value={{ user: mockUser, logout: mockLogout, login: mockLogin }}
      >
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>,
    );

    // Ouvre le menu déroulant
    fireEvent.click(screen.getByTestId('user-toggle'));

    // Clique sur le bouton "Déconnexion"
    fireEvent.click(screen.getByText('Déconnexion'));

    // Vérifie que la fonction logout est appelée
    expect(mockLogout).toHaveBeenCalled();
  });
});
