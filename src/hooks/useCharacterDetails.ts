import { useEffect, useState } from 'react';
import { CharacterDetail } from '../types';
import { fetchCharacterDetails } from '../services/api';

export const useCharacterDetails = (uid: string | undefined) => {
  const [characterData, setCharacterData] = useState<CharacterDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uid) return;

    const getCharacterDetails = async () => {
      setIsLoading(true);
      try {
        setError('');
        const response = await fetchCharacterDetails(uid);
        setCharacterData(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    getCharacterDetails();
  }, [uid]);

  return { characterData, isLoading, error };
};
