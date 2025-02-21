import React from 'react';
import { Character } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleItem } from '../../slices/selectedSlice';

interface ResultListProps {
  characters: Character[];
  onCharacterClick: (id: number) => void;
}

const ResultListView: React.FC<ResultListProps> = ({
  characters,
  onCharacterClick,
}) => {
  const dispatch = useDispatch();
  const selectedIds = useSelector(
    (state: RootState) => state.selected.selectedIds
  );

  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id} className="character-item">
          <input
            type="checkbox"
            checked={!!selectedIds[character.id]}
            onChange={() => dispatch(toggleItem(character.id))}
          />
          <button onClick={() => onCharacterClick(character.id)}>
            {character.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ResultListView;
