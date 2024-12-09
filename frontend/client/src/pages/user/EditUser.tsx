import UserForm from '../../containers/UserForm';
import { useParams } from 'react-router-dom';
import React from 'react';
const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex p-4 items-center justify-center">
      <UserForm id={id} />
    </div>
  );
};

export default EditUser;
