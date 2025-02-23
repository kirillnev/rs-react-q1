import React from 'react';
import { Character } from '../../types';

interface DetailPropsType {
  character: Character;
  onClose: () => void;
}

const DetailView: React.FC<DetailPropsType> = ({ character, onClose }) => {
  const { name, species, gender, image, status, type } = character;

  return (
    <div className="detail-container">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <div className="character-details">
        <h2>{name}</h2>
        {species && <p>Species: {species}</p>}
        {type && <p>Type: {type}</p>}
        {gender && <p>Gender: {gender}</p>}
        {status && <p>Status: {status}</p>}
        {image && <img src={image} alt={name} />}
      </div>
    </div>
  );
};

export default DetailView;
