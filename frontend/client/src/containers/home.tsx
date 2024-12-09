// src/containers/HomeContainer.tsx

import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/services/userService';
import UserTable from '../components/table/UserTable';
import UserFilter from '../components/table/UserFilter';
import Pagination from '../components/table/Pagination';
import { User } from '#types/user';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const HomeContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [filter, setFilter] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
  });
  const navigate = useNavigate();
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers(page, filter);
      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Erreur lors de la récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };
  const handleFilter = (
    firstName: string,
    lastName: string,
    email: string,
    birthDate: string,
  ) => {
    setFilter({ firstName, lastName, email, birthDate });
    setPage(1); // Réinitialiser à la première page lors du filtrage
  };
  useEffect(() => {
    fetchUsers();
  }, [page, limit, sortBy, sortOrder, filter]);

  const handleSort = (column: string) => {
    setSortBy(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Réinitialiser à la première page lors du changement de limite
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const buttonStyle =
    'ml-2 mr-2 p-2 border text-white font-medium rounded cursor-pointer bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-500 focus:bg-teal-900 hover:shadow-lg';
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
        <Button
          text="Ajouter un utilisateur"
          type="button"
          onClick={() => navigate('/create')}
          className={buttonStyle}
        />
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <UserFilter onFilter={handleFilter} />
          <UserTable
            users={users}
            onSort={handleSort}
            fetchUsers={fetchUsers}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default HomeContainer;
