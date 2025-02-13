export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  image: string;
}

export interface PageData {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
  current: number;
}

export interface ApiResponse {
  info: PageData;
  results: Character[];
}

/*export interface ApiResponseDetail {
  character: Character;
}*/
