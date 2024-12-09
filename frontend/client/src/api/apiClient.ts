import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercepteur pour inclure le JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn('No token found in localStorage');
  }
  return config;
});

// Gérer les réponses d'erreur
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Backend error:', error.response.data);
    } else {
      console.error('Network or other error:', error.message);
    }
    return Promise.reject(error);
  },
);
export default apiClient;
