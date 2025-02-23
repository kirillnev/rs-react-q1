import React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetCharactersQuery } from '../../slices/apiSlice';
import Spinner from '../Spinner';
import ResultListView from './ResultListView';
import Pagination from '../Pagination';
import Flyout from '../Flyout';
import { onPageChange } from './helper';

interface ResultListContainerProps {
  searchQuery: string;
}

const ResultList: React.FC<ResultListContainerProps> = ({ searchQuery }) => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: charactersData,
    isFetching,
    error,
  } = useGetCharactersQuery({ page, searchQuery });

  const handleCharacterClick = (id: number) => {
    navigate(`${id}${location.search}`);
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (error || !charactersData) {
    return <div className="error">Something went wrong.</div>;
  }

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage, charactersData, location, navigate);
  };

  return (
    <>
      <Flyout />
      <ResultListView
        characters={charactersData.results}
        onCharacterClick={handleCharacterClick}
      />
      {charactersData.info.pages > 1 && (
        <Pagination
          pageData={{
            count: charactersData.info.count,
            pages: charactersData.info.pages,
            current: page,
          }}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ResultList;
