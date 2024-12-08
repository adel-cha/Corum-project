import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { loginUser } from '../api/services/authService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    try {
      const { token, userData } = await loginUser(email, password); // Attendre la réponse de l'API
      login(token, userData); // Utilisez la fonction de contexte pour stocker les données de l'utilisateur
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Afficher l'erreur à l'utilisateur
      } else {
        setError('Une erreur inconnue est survenue.'); // Gérer les autres types d'erreurs
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <InputField
        id="email"
        label="Adresse Email"
        type="email"
        value={email}
        placeholder="exemple@domaine.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        value={password}
        placeholder="Votre mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button text="Se connecter" type="submit" />
    </form>
  );
};

export default LoginForm;
