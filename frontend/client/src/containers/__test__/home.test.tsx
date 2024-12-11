import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import HomeContainer from '../home';
import * as userService from '../../api/services/userService';
import { renderWithAuthAndRouter } from '../../tests/test.utils';

vi.mock('../../api/services/userService', () => ({
  getUsers: vi.fn(),
}));
const getUsersMock = vi.mocked(userService.getUsers);
const mockUser = {
  id: '123',
  firstName: 'John ',
  lastName: 'Doe',
  email: 'john@doe.com',
  birthDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  active: true,
};
const MockedHomeContainer = () =>
  renderWithAuthAndRouter(<HomeContainer />, { user: mockUser });

describe('HomeContainer', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the user list and fetches users successfully', async () => {
    // Mock the response for getUsers
    getUsersMock.mockResolvedValue({
      data: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          birthDate: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          birthDate: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      totalPages: 1,
      total: 0,
      page: 0,
    });

    render(<MockedHomeContainer />);

    // Wait for the loading state to finish
    await waitFor(() => expect(screen.queryByText(/Loading.../)).toBeNull());

    // Check if the users are displayed
    expect(screen.getByText('Liste des Utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('displays an error message when fetching users fails', async () => {
    // Mock the response to simulate an error
    getUsersMock.mockRejectedValue(
      new Error('Erreur lors de la récupération des utilisateurs'),
    );

    render(<MockedHomeContainer />);

    // Wait for the loading state to finish
    await waitFor(() => expect(screen.queryByText(/Loading.../)).toBeNull());

    // Check if the error message is displayed
    expect(
      screen.getByText(/Erreur lors de la récupération des utilisateurs/i),
    ).toBeInTheDocument();
  });

  it('filters users when filter criteria are applied', async () => {
    // Mock the response for getUsers
    getUsersMock.mockResolvedValueOnce({
      data: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          birthDate: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          birthDate: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      totalPages: 1,
      total: 0,
      page: 0,
    });

    render(<MockedHomeContainer />);

    // Wait for the loading state to finish
    await waitFor(() => expect(screen.queryByText(/Loading.../)).toBeNull());

    // Now mock the response for filtered results
    getUsersMock.mockResolvedValueOnce({
      data: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          birthDate: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      totalPages: 1,
      total: 0,
      page: 0,
    });

    // Assuming UserFilter component triggers handleFilter
    const firstNameInput = screen.getByTestId('firstName'); // Adjust placeholder as necessary
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    // Assuming a filter button exists and we need to trigger it
    const filterButton = screen.getByTestId('submit filter'); // Adjust text as necessary
    fireEvent.click(filterButton);

    // Wait for the filtered users to be displayed
    await waitFor(() => expect(screen.getByText('John')).toBeInTheDocument());
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('changes pagination when the page is updated', async () => {
    getUsersMock.mockResolvedValueOnce({
      data: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          birthDate: new Date('1990-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      totalPages: 2, // Simulate multiple pages
      total: 0,
      page: 0,
    });

    render(<MockedHomeContainer />);

    await waitFor(() => expect(screen.queryByText(/Loading.../)).toBeNull());

    // Check if pagination is visible
    expect(screen.getByTestId('page count')).toBeInTheDocument(); // Assuming the current page is displayed

    // Simulate changing to the next page
    const nextPageButton = screen.getByTestId('next page'); // Adjust button text as necessary
    fireEvent.click(nextPageButton);

    // Ensure users are fetched for the new page
    await waitFor(() => {
      expect(userService.getUsers).toHaveBeenCalledWith(1, 10, 'name', 'asc', {
        birthDate: '',
        email: '',
        firstName: '',
        lastName: '',
      }); // Check params
    });
  });
});
