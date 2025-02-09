// src/components/Layout.tsx
import React, { useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Search from './Search';
import ResultList from './ResultList';
import useLocalStorage from '../hooks/useLocalStorage.ts';

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage<string>(
    'searchQuery',
    ''
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleListClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        const searchParams = new URLSearchParams(location.search);
        navigate({
          pathname: '',
          search: searchParams.toString(),
        });
      }
    },
    [location, navigate]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('?page=1', { replace: true });
  };

  return (
    <div className="container">
      <header onClick={handleListClick}>
        <Search onSearch={handleSearch} initialQuery={searchQuery} />
      </header>
      <div className="content">
        <div className="result-list" onClick={handleListClick}>
          <ResultList searchQuery={searchQuery} />
        </div>
        <div className="detail-panel">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
