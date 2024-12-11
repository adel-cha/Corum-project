import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../apiClient';
import { User } from '../../types/user';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`/login`, {
      email,
      password,
    });
    const { token } = response.data;
    const userData: User = jwtDecode(token);
    return { token, userData }; // Retourner les données de l'utilisateur et le token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.statusCode);
    } else {
      console.log('[API ERROR] error :', error);
      throw new Error('Erreur lors de la connexion');
    }
  }
};
