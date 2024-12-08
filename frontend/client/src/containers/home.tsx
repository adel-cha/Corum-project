// src/containers/HomeContainer.tsx

import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/services/userService';
import UserTable from '../components/table/UserTable';
import UserFilter from '../components/table/UserFilter';
import Pagination from '../components/table/Pagination';
import { User } from '#types/user';

const HomeContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [filter, setFilter] = useState({ firstName: '', email: '' });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers(page, filter);
      console.log('response', response);

      setUsers(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('Erreur lors de la récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fonction pour récupérer les utilisateurs avec la pagination
    const fetchUsers = async () => {
      // Remplacez ceci par votre logique d'appel API pour obtenir les utilisateurs
      const response = await fetch(
        `/api/users?page=${page}&firstName=${filter.firstName}&email=${filter.email}`,
      );
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    };

    fetchUsers();
  }, [page, filter]);
  const handleFilter = (firstName: string, email: string) => {
    setFilter({ firstName, email });
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>

      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <UserFilter onFilter={handleFilter} />
          <UserTable users={users} onSort={handleSort} />
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
