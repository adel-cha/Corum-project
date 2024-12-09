import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { deleteUser } from '../../../api/services/userService';
import { useAuth } from '../../../hooks/useAuth';
import Modal from './DeleteModal';

interface TableColumnProps {
  value: string;
  className?: string;
  lastColumn?: boolean;
  fetchUsers?: () => void;
}

export const TableColumn: React.FC<TableColumnProps> = ({
  value,
  className = 'py-2 px-4 border-b border-gray-200',
  lastColumn = false,
  fetchUsers,
}) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(value);
    if (fetchUsers) fetchUsers();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {lastColumn ? (
        <td className={className}>
          <div className="flex justify-around">
            <Link to={`/edit/${value}`}>
              <FaEdit className={'text-teal-600 cursor-pointer'} />
            </Link>
            {user?.id !== value ? (
              <FaTrash
                className={'text-teal-600 cursor-pointer'}
                onClick={handleDeleteClick}
              />
            ) : (
              <FaTrash className={' opacity-0'} />
            )}
          </div>
        </td>
      ) : (
        <td className={className}>{value}</td>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
