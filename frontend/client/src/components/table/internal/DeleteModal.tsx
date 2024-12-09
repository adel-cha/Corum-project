import React from 'react';
import Button from '../../../components/Button';
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Confirmation</h2>
        <p>Êtes-vous sûr de vouloir supprimer cet utilisateur?</p>
        <div className="flex justify-end mt-4">
          <Button
            text="Annuler"
            type="button"
            onClick={onClose}
            className={'px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2'}
          />
          <Button
            text="Supprimer"
            type="button"
            onClick={onConfirm}
            className={'px-4 py-2 bg-red-600 text-white rounded'}
          />
        </div>
      </div>
    </div>
  );
};
export default Modal;
