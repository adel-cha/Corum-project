import React from 'react';
import LoginForm from '../containers/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6 flex justify-center">
          <img src="/corum_logo.png" alt="Logo Corum" className="w-32 h-auto" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
