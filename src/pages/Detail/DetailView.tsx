import React from 'react';
import { Character } from '../../types.ts';

interface DetailPropsType {
  character: Character;
  onClose: () => void;
}

const DetailView: React.FC<DetailPropsType> = ({ character, onClose }) => {
  return (
    <div className="detail-container">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <div className="character-details">
        <h2>{character.name}</h2>
        {character.species && <p>Species: {character.species}</p>}
        {character.type && <p>Type: {character.type}</p>}
        {character.gender && <p>Gender: {character.gender}</p>}
        {character.status && <p>Status: {character.status}</p>}
        {character.image && <img src={character.image} alt={character.name} />}
      </div>
    </div>
  );
};

export default DetailView;
