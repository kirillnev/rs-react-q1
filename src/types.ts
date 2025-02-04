export interface Character {
  uid: string;
  name: string;
  gender: string;
  height: number;
  weight: number;
  deceased: boolean;
}

export interface SearchState {
  searchTerm: string;
  isLoading: boolean;
  results: Character[];
}

export interface ApiResponse {
  page: {
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
  characters: Array<Character>;
}
