import React from 'react';
import { Character } from '../types';

interface ResultListProps {
  characters: Character[];
  onCharacterClick: (id: number) => void;
}

const ResultListView: React.FC<ResultListProps> = ({
  characters,
  onCharacterClick,
}) => {
  return (
    <div className="result-list-container">
      <ul>
        {characters.map((character) => (
          <li
            key={character.id}
            onClick={() => onCharacterClick(character.id)}
            className="character-item"
          >
            {character.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultListView;
