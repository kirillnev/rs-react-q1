import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import LayoutView from './LayoutView';

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
        navigate({ pathname: '', search: searchParams.toString() });
      }
    },
    [location, navigate]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('?page=1', { replace: true });
  };

  return (
    <LayoutView
      searchQuery={searchQuery}
      onSearch={handleSearch}
      onListClick={handleListClick}
    />
  );
};

export default Layout;
