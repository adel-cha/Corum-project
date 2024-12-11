// src/components/__tests__/TableColumn.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TableColumn } from '../TableColumn';
import { deleteUser } from '../../../../api/services/userService';
import { renderWithAuthAndRouter } from '../../../../tests/test.utils';
// Mock du service deleteUser
vi.mock('../../../../api/services/userService', () => ({
  deleteUser: vi.fn(),
}));

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
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
// Mock du composant Modal
vi.mock('../DeleteModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onConfirm }: ModalProps) =>
    isOpen ? (
      <div data-testid="modal">
        <button onClick={onClose} data-testid="modal-close">
          Close
        </button>
        <button onClick={onConfirm} data-testid="modal-confirm">
          Confirm
        </button>
      </div>
    ) : null,
}));

describe('TableColumn component', () => {
  it('renders value in a standard table cell', () => {
    render(
      renderWithAuthAndRouter(
        <table>
          <tbody>
            <tr>
              <TableColumn value="Test Value" />
            </tr>
          </tbody>
        </table>,
        { user: mockUser },
      ),
    );

    // Vérifie que la valeur est affichée
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('renders edit and delete icons in the last column', () => {
    render(
      renderWithAuthAndRouter(
        <table>
          <tbody>
            <tr>
              <TableColumn value="456" lastColumn />
            </tr>
          </tbody>
        </table>,
        { user: mockUser },
      ),
    );

    // Vérifie que les icônes sont affichées
    expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });

  it('does not render delete icon for the current user', () => {
    render(
      renderWithAuthAndRouter(
        <table>
          <tbody>
            <tr>
              <TableColumn value="123" lastColumn />
            </tr>
          </tbody>
        </table>,
        { user: mockUser },
      ),
    );

    // Vérifie que l'icône de suppression est invisible
    const deleteIcon = screen.getByTestId('delete-icon');
    expect(deleteIcon).toHaveClass('opacity-0');
  });

  it('opens and closes the modal on delete icon click', async () => {
    const mockFetchUsers = vi.fn();
    render(
      renderWithAuthAndRouter(
        <table>
          <tbody>
            <tr>
              <TableColumn value="456" lastColumn fetchUsers={mockFetchUsers} />
            </tr>
          </tbody>
        </table>,
        { user: mockUser },
      ),
    );
    const deleteIcon = screen.getByTestId('delete-icon');

    // Clique sur l'icône de suppression
    fireEvent.click(deleteIcon);

    // Vérifie que le modal est affiché
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // Ferme le modal
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('calls deleteUser and fetchUsers on confirm delete', async () => {
    const mockFetchUsers = vi.fn();
    render(
      renderWithAuthAndRouter(
        <table>
          <tbody>
            <tr>
              <TableColumn value="456" lastColumn fetchUsers={mockFetchUsers} />
            </tr>
          </tbody>
        </table>,
        { user: mockUser },
      ),
    );
    const deleteIcon = screen.getByTestId('delete-icon');
    expect(deleteIcon).toBeInTheDocument();
    // Clique sur l'icône de suppression
    fireEvent.click(deleteIcon);

    // Clique sur le bouton de confirmation dans le modal
    fireEvent.click(screen.getByTestId('modal-confirm'));
    expect(screen.queryByTestId('modal-confirm')).toBeInTheDocument();
    await fireEvent.click(screen.getByTestId('modal-confirm'));

    // Vérifie que deleteUser a été appelé avec la bonne valeur
    await expect(deleteUser).toHaveBeenCalledWith('456');

    // Vérifie que fetchUsers a été appelé
    expect(mockFetchUsers).toHaveBeenCalled();

    // Vérifie que le modal est fermé
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
