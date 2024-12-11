import Button from '../../components/Button';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number; // Added prop for items per page
  onPageChange: (newPage: number) => void;
  handleLimitChange: (newItemsPerPage: number) => void; //
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  handleLimitChange,
}) => {
  return (
    <div className="mt-4">
      <Button
        dataTestId="prev page"
        text="< Précédent"
        className={`ml-2 mr-2 p-2 border ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-teal-600 text-white'} rounded`}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <span data-testid="page count">
        Page {currentPage} sur {totalPages}
      </span>
      <Button
        dataTestId="next page"
        text="Suivant >"
        className={`ml-2 mr-2 p-2 border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-teal-600 text-white'} rounded`}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
      <select
        value={itemsPerPage}
        onChange={(e) => handleLimitChange(Number(e.target.value))}
        className="ml-4 p-2 border rounded"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <span className="ml-2">Articles par page</span>
    </div>
  );
};

export default Pagination;
