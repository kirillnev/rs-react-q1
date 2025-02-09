import { ApiResponse, CharacterDetail } from '../types';

export async function fetchCharacters(
  page: number,
  searchTerm: string
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `https://stapi.co/api/v1/rest/character/search?pageSize=10&pageNumber=${page - 1}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(searchTerm)}`,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching characters:', error);
    throw error;
  }
}

export async function fetchCharacterDetails(
  uid: string
): Promise<CharacterDetail> {
  try {
    const response = await fetch(
      `https://stapi.co/api/v1/rest/character?uid=${encodeURIComponent(uid)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch character details: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching character details:', error);
    throw error;
  }
}
