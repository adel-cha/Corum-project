// src/components/UserFilter.tsx

import React, { useState } from 'react';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
interface UserFilterProps {
  onFilter: (
    firstName: string,
    email: string,
    lastName: string,
    birthDate: string,
  ) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ onFilter }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(firstName, lastName, email, birthDate);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex-1">
          <InputField
            dataTestId="firstName"
            id="firstName"
            label="Prénom"
            type="text"
            name="firstName"
            value={firstName}
            placeholder="Entrez le Prénom"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <InputField
            dataTestId="lastName"
            id="lastName"
            label="Nom"
            type="text"
            name="lastName"
            value={lastName}
            placeholder="Entrez le nom"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <InputField
            dataTestId="email"
            id="email"
            label="Email"
            type="text"
            name="email"
            value={email}
            placeholder="Entrez la date de naissance"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <InputField
            dataTestId="birthDate"
            id="birthDate"
            label="Date de naissance"
            type="date"
            name="birthDate"
            value={birthDate}
            placeholder="Entrez la date de naissance"
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div className="flex items-end mt-4 md:mt-0">
          <Button text="Filtrer" dataTestId="submit filter" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default UserFilter;
