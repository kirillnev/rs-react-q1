export interface Character {
  uid: string;
  name: string;
  gender?: string;
  yearOfBirth?: string;
  placeOfBirth?: string;
}

export interface ApiResponse {
  page: {
    pageNumber: number;
    pageSize: number;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
  };
  characters: Character[];
}

export interface CharacterDetail {
  character: Character;
}
