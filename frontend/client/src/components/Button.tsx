import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  className = 'mt-6 transition-all block py-3 px-4 w-full text-white font-medium rounded cursor-pointer bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-500 focus:bg-teal-900 hover:shadow-lg',
  type = 'button',
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {text}
  </button>
);

export default Button;
