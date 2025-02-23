import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { unselectAll } from '../../slices/selectedSlice';
import { generateCsvUrl } from './helper';

const Flyout: React.FC = () => {
  const { selectedCharacters } = useSelector(
    (state: RootState) => state.selected
  );
  const dispatch = useDispatch();
  const [csvUrl, setCsvUrl] = useState<string | null>(null);

  useEffect(() => {
    const blobUrl = generateCsvUrl(selectedCharacters);

    setCsvUrl(blobUrl);

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [selectedCharacters]);

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  if (selectedCharacters.length === 0) {
    return null;
  }

  return (
    <div className="flyout">
      <span>{`${selectedCharacters.length} items selected`}</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      {csvUrl && (
        <a
          href={csvUrl}
          download={`${selectedCharacters.length}_characters.csv`}
        >
          <button>Download all</button>
        </a>
      )}
    </div>
  );
};

export default Flyout;
