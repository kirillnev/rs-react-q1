export interface Character {
  id: number;
  name: string;
  status?: 'Alive' | 'Dead' | 'unknown';
  species?: string;
  type?: string;
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
  image?: string;
}

export interface PageData {
  count: number;
  pages: number;
  current: number;
}

export interface ApiResponse {
  info: PageData & {
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
