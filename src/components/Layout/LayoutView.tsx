import React from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../Search';
import ResultList from '../ResultList';
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

interface LayoutViewProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const LayoutView: React.FC<LayoutViewProps> = ({ searchQuery, onSearch }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`container ${theme === 'dark' && 'dark'}`}
      data-testid="layout-container"
    >
      <header>
        <Search onSearch={onSearch} initialQuery={searchQuery} />
        <ThemeToggle />
      </header>
      <div className="content">
        <div className="result-list" data-testid="result-list">
          <ResultList searchQuery={searchQuery} />
        </div>
        <div className="detail-panel" data-testid="detail-panel">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutView;
