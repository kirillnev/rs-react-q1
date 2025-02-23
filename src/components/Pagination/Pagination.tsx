import React from 'react';
import { PageData } from '../../types';

interface PaginationProps {
  pageData: PageData;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageData, onPageChange }) => {
  const { pages, current } = pageData;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="pagination-button"
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {current} of {pages}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === pages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
