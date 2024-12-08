import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000', // Base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour inclure le JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer les réponses d'erreur
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Vous pouvez gérer les erreurs globalement ici
    return Promise.reject(error);
  },
);
export default apiClient;
