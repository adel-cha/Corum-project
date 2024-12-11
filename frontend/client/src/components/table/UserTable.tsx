// src/components/UserTable.tsx

import React from 'react';
import { User } from './../../types/user';
import { TableColumnHeader, TableColumn } from './internal';

interface UserTableProps {
  users: User[];
  onSort: (column: string) => void;
  fetchUsers: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSort, fetchUsers }) => {
  const UserFilterLabels = [
    { name: 'firstName', label: 'Prenom' },
    { name: 'lastName', label: 'Nom' },
    { name: 'email', label: 'Email' },
    { name: 'birthday', label: 'Date de Naissance' },
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {UserFilterLabels.map((filterLabel) => (
              <TableColumnHeader
                key={filterLabel.name}
                onSort={onSort.bind(this, filterLabel.name)}
                label={filterLabel.label}
              />
            ))}
            <th className=" border-b border-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <TableColumn value={user.firstName} />
              <TableColumn value={user.lastName} />
              <TableColumn value={user.email} />
              <TableColumn
                value={
                  user.birthDate ? user.birthDate.toLocaleDateString() : ''
                }
              />
              <TableColumn
                value={user.id}
                lastColumn={true}
                fetchUsers={fetchUsers}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
