import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCharacterDetails } from '../../hooks/useCharacterDetails';
import Spinner from '../Spinner/Spinner';
import DetailView from '../DetailView/DetailView';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { character, isLoading, error } = useCharacterDetails(id);
  const location = useLocation();

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div className="error" data-testid="error">
        {error}
      </div>
    );
  }
  if (!character) {
    return <div>No character data available</div>;
  }

  return <DetailView character={character} onClose={handleClose} />;
};

export default Detail;
