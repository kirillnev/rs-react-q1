import { Character, ApiResponse } from '../types';

export async function searchCharacters(
  searchTerm: string
): Promise<Character[]> {
  try {
    const response = await fetch(
      'https://stapi.co/api/v1/rest/character/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(searchTerm)}`,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return data.characters;
  } catch (error) {
    console.error('Error searching characters:', error);
    throw error;
  }
}
