import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer bg-gradient-to-r from-teal-600 to-teal-400 hover:from-teal-700 hover:to-teal-500 focus:bg-teal-900 transform hover:-translate-y-1 hover:shadow-lg"
  >
    {text}
  </button>
);

export default Button;
