import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetCharacterDetailsQuery } from '../../slices/apiSlice';
import Spinner from '../../components/Spinner';
import DetailView from './DetailView';

const Detail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: character,
    error,
    isFetching,
  } = useGetCharacterDetailsQuery(id);
  const location = useLocation();

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  if (isFetching) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div className="error" data-testid="error">
        {error.toString()}
      </div>
    );
  }
  if (!character) {
    return <div>No character data available</div>;
  }

  return <DetailView character={character} onClose={handleClose} />;
};

export default Detail;
