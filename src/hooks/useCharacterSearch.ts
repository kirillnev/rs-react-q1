import { useEffect, useState } from 'react';
import { ApiResponse } from '../types';
import { fetchCharacters } from '../services/api';

export const useCharacterSearch = (page: number, searchTerm: string) => {
  const [charactersData, setCharactersData] = useState<ApiResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const searchCharacters = async () => {
      setIsLoading(true);
      try {
        setError('');
        const response = await fetchCharacters(page, searchTerm);
        setCharactersData(response);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    searchCharacters();
  }, [page, searchTerm]);

  return { charactersData, isLoading, error };
};
