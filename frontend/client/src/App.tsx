import React from 'react';
import { AppRoutes } from './router';
import { Header } from './components/header/Header';
import Breadcrumb from './components/Breadcrumb';
import useBreadcrumbs from './hooks/useBreadcrumbs';

const App: React.FC = () => {
  const breadcrumbItems = useBreadcrumbs();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © 2024 Mon Application. Tous droits réservés.
      </footer>
    </div>
  );
};

export default App;
