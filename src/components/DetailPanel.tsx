import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCharacterDetails } from '../hooks/useCharacterDetails';
import Spinner from './Spinner';

const DetailPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { characterData, isLoading, error } = useCharacterDetails(id);
  const location = useLocation();

  const handleClose = () => {
    navigate(`/${location.search}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;
  if (!characterData) return null;

  return (
    <div className="detail-container">
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
      <div className="character-details">
        <h2>{characterData.character.name}</h2>
        {characterData.character.gender && (
          <p>Gender: {characterData.character.gender}</p>
        )}
        {characterData.character.yearOfBirth && (
          <p>Birth Year: {characterData.character.yearOfBirth}</p>
        )}
        {characterData.character.placeOfBirth && (
          <p>Place of Birth: {characterData.character.placeOfBirth}</p>
        )}
      </div>
    </div>
  );
};

export default DetailPanel;
