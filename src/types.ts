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
