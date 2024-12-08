// src/api/userService.ts

import apiClient from '../apiClient';
import axios from 'axios';
import { UserFilter, UsersResponseSchema } from '../../types/user';

export const getUsers = async (page: number, filters: UserFilter) => {
  try {
    const response = await apiClient.get('/users', {
      params: {
        page,
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
      console.log('[API ERROR] error:', error);
      throw new Error('Erreur lors de la récupération des utilisateurs');
    }
  }
};
