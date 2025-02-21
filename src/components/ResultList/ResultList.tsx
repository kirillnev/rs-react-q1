import React from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetCharactersQuery } from '../../slices/apiSlice';
import Spinner from '../Spinner/Spinner';
import ResultListView from '../ResultListView/ResultListView';
import Pagination from '../Pagination/Pagination';
import Flyout from '../Flyout/Flyout';

interface ResultListContainerProps {
  searchQuery: string;
}

const ResultList: React.FC<ResultListContainerProps> = ({ searchQuery }) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
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

  const handlePageChange = (newPage: number) => {
    if (
      newPage < 1 ||
      (charactersData && newPage > charactersData.info.pages)
    ) {
      return;
    }
    const updatedSearchParams = new URLSearchParams(location.search);
    updatedSearchParams.set('page', newPage.toString());

    navigate({
      pathname: location.pathname,
      search: updatedSearchParams.toString(),
    });
  };

  if (isFetching) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error">Something went wrong.</div>;
  }

  if (!charactersData?.results.length) {
    return (
      <div className="no-results">
        {searchQuery
          ? `No results found for "${searchQuery}"`
          : 'Please enter a search query'}
      </div>
    );
  }

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
