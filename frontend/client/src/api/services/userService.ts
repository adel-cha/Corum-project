import apiClient from '../apiClient';
import axios from 'axios';
import {
  UserFilter,
  UsersResponseSchema,
  UserSchema,
  User,
} from '../../types/user';

export const getUsers = async (
  page: number,
  limit: number,
  sortBy: string,
  sortOrder: string,
  filters: UserFilter,
) => {
  try {
    const response = await apiClient.get('/users', {
      params: {
        page,
        limit,
        sortBy,
        sortOrder,
        ...filters, // Ajoute les filtres si nécessaires
      },
    });
    const validatedData = UsersResponseSchema.parse(response.data);
    return validatedData; // Retourner les données validées
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des utilisateurs',
      );
    } else {
      console.error('[API ERROR] error:', error);
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
  }
};

export const getUsersById = async (id: string) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    const validatedData = UserSchema.parse(response.data);
    return validatedData; // Retourner les données validées
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des utilisateurs',
      );
    } else {
      console.log('[API ERROR] error:', error);
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
  }
};

export const createUser = async (
  userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  try {
    const response = await apiClient.post('/users', userData);
    const validatedData = UserSchema.parse(response.data);
    return validatedData; // Retourner les données validées
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la création de l'utilisateur",
      );
    } else {
      console.error('[API ERROR] error:', error);
      throw new Error("Erreur lors de la création de l'utilisateur");
    }
  }
};

export const updateUser = async (
  id: string,
  userData: Partial<
    Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
      password: string;
    }
  >,
) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    const validatedData = UserSchema.parse(response.data);
    return validatedData; // Retourner les données validées
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour de l'utilisateur",
      );
    } else {
      console.error('[API ERROR] error:', error);
      throw new Error("Erreur lors de la mise à jour de l'utilisateur");
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    // Vous pouvez retourner une confirmation ou l'ID supprimé si nécessaire
    return response.data; // Retourner les données validées ou une confirmation
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de l'utilisateur",
      );
    } else {
      console.error('[API ERROR] error:', error);
      throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
  }
};
