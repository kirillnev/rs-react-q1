import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import LayoutView from './LayoutView';

const Layout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('?page=1', { replace: true });
  };

  return <LayoutView searchQuery={searchQuery} onSearch={handleSearch} />;
};

export default Layout;
