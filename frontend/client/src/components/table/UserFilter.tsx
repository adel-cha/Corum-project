// src/components/UserFilter.tsx

import React, { useState } from 'react';

interface UserFilterProps {
  onFilter: (name: string, email: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(firstName, email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez le Prénom"
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez le nom"
          />
        </div>
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Entrez l'email"
          />
        </div>
        <div className="flex items-end mt-4 md:mt-0">
          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-200"
          >
            Filtrer
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserFilter;
