import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { unselectAll } from '../../slices/selectedSlice.ts';

const Flyout: React.FC = () => {
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.selected
  );
  const dispatch = useDispatch();

  if (selectedCharacters.length === 0) {
    return null;
  }

  const handleDownload = () => {
    console.log(selectedCharacters);
  };

  return (
    <div className="flyout">
      <span>{`${selectedCharacters.length} items selected`}</span>
      <button
        onClick={() => {
          dispatch(unselectAll());
        }}
      >
        {`Unselect all`}
      </button>
      <button onClick={handleDownload}>{`Download all`}</button>
    </div>
  );
};

export default Flyout;
