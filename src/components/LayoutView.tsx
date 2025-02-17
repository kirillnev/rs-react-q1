import React from 'react';
import { Outlet } from 'react-router-dom';
import Search from './Search';
import ResultListContainer from './ResultList.tsx';

interface LayoutViewProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  onListClick: (e: React.MouseEvent) => void;
}

const LayoutView: React.FC<LayoutViewProps> = ({
  searchQuery,
  onSearch,
  onListClick,
}) => (
  <div className="container">
    <header>
      <Search onSearch={onSearch} initialQuery={searchQuery} />
    </header>
    <div className="content">
      <div
        className="result-list"
        data-testid="result-list"
        onClick={onListClick}
      >
        <ResultListContainer searchQuery={searchQuery} />
      </div>
      <div className="detail-panel" data-testid="detail-panel">
        <Outlet />
      </div>
    </div>
  </div>
);

export default LayoutView;
