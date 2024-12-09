import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  it('renders the button with the correct text', () => {
    render(<Button text="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});