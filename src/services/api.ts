import { ApiResponse, Character } from '../types';

const getCurrentPage = (prev: string | null): number => {
  if (!prev) return 1;

  return Number(new URL(prev).searchParams.get('page')) + 1;
};

export async function fetchCharacters(
  page: number,
  searchTerm: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${encodeURIComponent(searchTerm)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    data.info.current = getCurrentPage(data.info.prev);
    return data;
  } catch (error) {
    console.error('Error searching characters:', error);
    throw error;
  }
}

export async function fetchCharacterDetails(uid: string): Promise<Character> {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${encodeURIComponent(uid)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch character details: ${response.status}`);
    }

    const data: Character = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
}
