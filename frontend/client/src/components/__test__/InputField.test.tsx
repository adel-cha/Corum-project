import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../InputField';
import { useState } from 'react';
const TestInputField = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <InputField
      id="test-input"
      label="Test Label"
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} // Met à jour la valeur
    />
  );
};

describe('InputField component', () => {
  const mockOnChange = vi.fn();

  it('renders the input field with the correct label', () => {
    render(
      <InputField
        id="test-input"
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
      />,
    );
    // Vérifie que le label est affiché
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('calls the onChange handler when the input value changes', () => {
    render(<TestInputField />);

    const input = screen.getByLabelText('Test Label') as HTMLInputElement;

    // Simuler le changement de valeur
    fireEvent.change(input, { target: { value: 'New Value' } });

    // Vérifie que l'input a la bonne valeur
    expect(input.value).toBe('New Value'); // Vérifie que l'input a été mis à jour
  });

  it('renders with the correct placeholder', () => {
    render(
      <InputField
        id="test-input"
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
        placeholder="Enter text here"
      />,
    );

    // Vérifie que le placeholder est présent
    expect(screen.getByPlaceholderText('Enter text here')).toBeInTheDocument();
  });

  it('renders as required when the required prop is true', () => {
    render(
      <InputField
        id="test-input"
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
        required
      />,
    );

    const input = screen.getByLabelText('Test Label');
    // Vérifie que l'attribut required est présent
    expect(input).toBeRequired();
  });
});
