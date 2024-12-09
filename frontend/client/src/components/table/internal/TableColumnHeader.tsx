// src/components/UserTable.tsx

import React from 'react';

interface TableColumnHeaderProps {
  label: string;
  onSort: (column: string) => void;
  className?: string;
}

export const TableColumnHeader: React.FC<TableColumnHeaderProps> = ({
  label,
  onSort,
  className = 'cursor-pointer text-left py-3 px-4 text-gray-600 font-semibold text-sm uppercase border-b border-gray-200',
}) => {
  return (
    <th onClick={() => onSort('birthday')} className={className}>
      {label}
    </th>
  );
};
