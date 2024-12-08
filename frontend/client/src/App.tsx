import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './router';
import { AuthProvider } from './providers/AuthProvider';
import { Header } from './components/header/Header';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <main className="p-4">
        <AppRoutes />
      </main>
    </AuthProvider>
  );
};

export default App;
