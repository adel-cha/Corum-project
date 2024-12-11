import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { loginUser } from '../api/services/authService';
import { getUsersById, updateUser } from '../api/services/userService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.active) {
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
  const handleNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur
    console.log('newPassword', newPassword);
    try {
      if (user) {
        if (newPassword === password) {
          return setError(
            "Le nouveau mot de passe doit être différent de l'ancien",
          );
        }
        const userDataToUpdate = await getUsersById(user.id);
        await updateUser(user.id, {
          ...userDataToUpdate,
          password: newPassword,
          active: true,
        });
        logout();
        const { token, userData } = await loginUser(email, password); // Attendre la réponse de l'API
        login(token, userData);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Afficher l'erreur à l'utilisateur
      } else {
        setError('Une erreur inconnue est survenue.'); // Gérer les autres types d'erreurs
      }
    }
  };

  return user && !user.active ? (
    <form onSubmit={handleNewPassword} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <InputField
        id="newPassword"
        label="Nouveau mot de passe"
        type="password"
        dataTestId={'newPassword'}
        value={newPassword}
        placeholder="Créer votre nouveau mot de passe"
        onChange={(e) => setNewPassword(e.target.value)}
        required={true}
      />
      <Button
        text="Créer mon mot de passe"
        dataTestId={'button-newPassword'}
        type="submit"
      />
    </form>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <InputField
        id="email"
        label="Adresse Email"
        type="email"
        dataTestId={'email'}
        value={email}
        placeholder="exemple@domaine.com"
        onChange={(e) => setEmail(e.target.value)}
        required={true}
      />
      <InputField
        id="password"
        label="Mot de passe"
        type="password"
        dataTestId={'password'}
        value={password}
        placeholder="Votre mot de passe"
        onChange={(e) => setPassword(e.target.value)}
        required={true}
      />
      <Button text="Se connecter" dataTestId={'button-login'} type="submit" />
    </form>
  );
};

export default LoginForm;
