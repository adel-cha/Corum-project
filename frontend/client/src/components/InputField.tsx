import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  dataTestId?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  name,
  type,
  value,
  onChange,
  dataTestId,
  placeholder,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center mt-1">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          id={id}
          data-testid={dataTestId}
          name={name}
          value={value} // La valeur de l'input est contrôlée
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="block w-full px-4 py-2 border h-9 border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="flex items-center justify-center px-3 h-9 border bg-gray-200  border-gray-300 rounded-r-md hover:bg-gray-300"
            aria-label={
              showPassword
                ? 'Masquer le mot de passe'
                : 'Afficher le mot de passe'
            }
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
