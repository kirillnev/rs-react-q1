import React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useCharacterSearch } from '../hooks/useCharacterSearch';
import Spinner from './Spinner';
import Pagination from './Pagination';

interface ResultListProps {
  searchQuery: string;
}

const ResultList: React.FC<ResultListProps> = ({ searchQuery }) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const navigate = useNavigate();
  const location = useLocation();

  const { charactersData, isLoading, error } = useCharacterSearch(
    page,
    searchQuery
  );

  const handleCharacterClick = (uid: string) => {
    navigate(`${uid}${location.search}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!charactersData?.characters.length) {
    return (
      <div className="no-results">
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : 'Please enter a search query'}
      </div>
    );
  }

  return (
    <div className="result-list-container">
      <ul>
        {charactersData.characters.map((character) => (
          <li
            key={character.uid}
            onClick={() => handleCharacterClick(character.uid)}
            className="character-item"
          >
            {character.name}
          </li>
        ))}
      </ul>
      {charactersData.page.totalPages > 1 && (
        <Pagination
          total={charactersData.page.totalElements}
          currentPage={page}
        />
      )}
    </div>
  );
};

export default ResultList;
