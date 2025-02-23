import React from 'react';
import { Character } from '../../types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store.ts';
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
  const selectedCharacters = useSelector(
    (state: RootState) => state.selected.selectedCharacters
  );

  if (!characters.length) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character.id} className="character-item">
          <input
            type="checkbox"
            checked={
              selectedCharacters.filter(
                (item: Character) => item.id === character.id
              ).length > 0
            }
            onChange={() => dispatch(toggleItem(character))}
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
