import {
  getUsersById,
  createUser,
  updateUser,
} from '../api/services/userService';
import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/user';

interface UserFormProps {
  id?: string; // Optionnel pour les modifications
}
const UserForm: React.FC<UserFormProps> = ({ id }) => {
  const [formData, setFormData] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      if (id) {
        const response = await getUsersById(id);

        setFormData(response);
      }
    } catch (err) {
      setError('Erreur lors de la récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fonction pour récupérer les utilisateurs avec la pagination
    fetchUser();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const date = new Date(value);
    setFormData({
      ...formData,
      [name]: !isNaN(date.getTime()) ? date : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!id) {
        // Création d'un utilisateur
        await createUser(formData);
      } else {
        await updateUser(id, formData);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const toISODate = (frenchDate: string): string => {
    const [day, month, year] = frenchDate.split('/');
    return `${year}-${month}-${day}`;
  };

  const buttonCancelStyle =
    'ml-2 mr-2 p-2 border bg-gray-200 text-gray-700 rounded  hover:shadow-lg';
  const buttonStyle =
    'ml-2 mr-2 p-2 border bg-teal-600 text-white rounded  hover:shadow-lg';
  return (
    <div className=" max-w-screen-md  h-full w-full  bg-gray-100">
      <div className="  bg-white rounded-lg flex justify-center shadow-md p-6">
        <div className="w-4/6">
          <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center ">
            {id ? 'Modifier un utilisateur' : 'Créer un utilisateur'}
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-4  ">
              <InputField
                id="firstName"
                name="firstName"
                label="Prénom"
                type="text"
                value={formData.firstName}
                placeholder="Entrez le prénom"
                onChange={handleChange}
                required={true}
              />
              <InputField
                id="lastName"
                name="lastName"
                label="Nom"
                type="text"
                value={formData.lastName}
                placeholder="Entrez le nom"
                onChange={handleChange}
                required={true}
              />
              <InputField
                id="email"
                name="email"
                label="Adresse Email"
                type="email"
                value={formData.email}
                placeholder="exemple@domaine.com"
                onChange={handleChange}
                required={true}
              />
              <InputField
                id="birthDate"
                label="Date de naissance"
                type="date"
                name="birthDate"
                value={
                  formData.birthDate
                    ? toISODate(formData.birthDate.toLocaleDateString())
                    : ''
                }
                placeholder="Entrez la date de naissance"
                onChange={handleChange}
                required={true}
              />
              <div className="flex justify-end">
                <Button
                  text="Annuler"
                  type="button"
                  onClick={() => navigate('/')}
                  className={buttonCancelStyle}
                />
                <Button
                  text="Enregistrer"
                  type="submit"
                  className={buttonStyle}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
