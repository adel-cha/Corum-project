import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  it('renders the button with the correct text', () => {
    render(<Button text="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('triggers the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Click Me" onClick={handleClick} />);

    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the provided className', () => {
    const customClass = 'custom-class';
    render(<Button text="Click Me" className={customClass} />);

    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveClass(customClass);
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Button text="Click Me" disabled={true} />);

    const buttonElement = screen.getByText('Click Me') as HTMLButtonElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('has the correct type attribute', () => {
    render(<Button text="Submit" type="submit" />);

    const buttonElement = screen.getByText('Submit') as HTMLButtonElement;
    expect(buttonElement.type).toBe('submit');
  });
});
