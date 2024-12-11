// src/components/Breadcrumb.test.tsx
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';
import { MemoryRouter } from 'react-router-dom';

describe('Breadcrumb', () => {
  it('renders breadcrumb items correctly', () => {
    const items = [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Details', path: '/products/1' },
    ];

    render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );

    // Vérifiez que chaque élément de la breadcrumb est présent
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();

    // Vérifiez que les séparateurs sont présents
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2); // 2 séparateurs
  });

  it('does not render when the Login item is present', () => {
    const items = [
      { label: 'Home', path: '/' },
      { label: 'Login', path: '/login' },
    ];

    const { container } = render(
      <MemoryRouter>
        <Breadcrumb items={items} />
      </MemoryRouter>,
    );

    // Vérifiez que le composant ne rend rien
    expect(container).toBeEmptyDOMElement();
  });
});
