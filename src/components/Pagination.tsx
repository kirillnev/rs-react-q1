import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
  total: number;
  currentPage: number;
  pageSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  pageSize = 10,
}) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage.toString());

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="pagination-button"
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
