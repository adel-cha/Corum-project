import Button from '../../components/Button';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const buttonStyle = 'ml-2 mr-2 p-2 border bg-teal-600 text-white rounded';
  return (
    <div className="mt-4">
      <Button
        text="< Précédent"
        className={buttonStyle}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <span>
        Page {currentPage} sur {totalPages}
      </span>
      <Button
        text="Suivant >"
        className={buttonStyle}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
