// src/components/UserTable.tsx

import React from 'react';
import { User } from '#types/user';

interface UserTableProps {
  users: User[];
  onSort: (column: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSort }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th
              onClick={() => onSort('firstName')}
              className="cursor-pointer text-left py-3 px-4 text-gray-600 font-semibold text-sm uppercase border-b border-gray-200"
            >
              Prenom
            </th>
            <th
              onClick={() => onSort('lastName')}
              className="cursor-pointer text-left py-3 px-4 text-gray-600 font-semibold text-sm uppercase border-b border-gray-200"
            >
              Nom
            </th>
            <th
              onClick={() => onSort('email')}
              className="cursor-pointer text-left py-3 px-4 text-gray-600 font-semibold text-sm uppercase border-b border-gray-200"
            >
              Email
            </th>
            <th
              onClick={() => onSort('birthday')}
              className="cursor-pointer text-left py-3 px-4 text-gray-600 font-semibold text-sm uppercase border-b border-gray-200"
            >
              Date de Naissance
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="py-2 px-4 border-b border-gray-200">
                {user.firstName}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.lastName}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.birthDate.toISOString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
