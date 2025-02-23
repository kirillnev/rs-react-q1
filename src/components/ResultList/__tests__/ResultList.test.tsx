import { render, screen } from '@testing-library/react';
import ResultList from '../ResultList.tsx';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useCharacterSearch } from '../../hooks/useCharacterSearch';
import { Character } from '../../../types.ts';

vi.mock('react-router-dom');
vi.mock('../../hooks/useCharacterSearch');
vi.mock('../Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));
vi.mock('../ResultListView/ResultListView', () => ({
  default: ({
    characters,
    onCharacterClick,
  }: {
    characters: Character[];
    onCharacterClick: (id: number) => void;
  }) => (
    <ul data-testid="result-list">
      {characters?.map((char) => (
        <li key={char.id} onClick={() => onCharacterClick(char.id)}>
          {char.name}
        </li>
      ))}
    </ul>
  ),
}));

vi.mock('../Pagination/Pagination', () => ({
  default: ({ onPageChange }: { onPageChange: (p: number) => void }) => {
    onPageChange(2);
    return <div data-testid="pagination">Pagination</div>;
  },
}));

describe('ResultList', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=1'),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({
      hash: '',
      key: '',
      pathname: '/',
      state: undefined,
      search: '?page=1',
    });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: null,
      isLoading: false,
      error: '',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('displays a spinner while loading', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: null,
      isLoading: true,
      error: '',
    });

    render(<ResultList searchQuery="Rick" />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('displays an error message in case of an error.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: null,
      isLoading: false,
      error: 'Some error',
    });

    render(<ResultList searchQuery="Rick" />);
    expect(screen.getByText('Some error')).toBeInTheDocument();
  });

  test('Displays "No results found" when the result is empty and searchQuery is present.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [],
        info: {
          count: 100,
          pages: 10,
          current: 5,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: '',
    });

    render(<ResultList searchQuery="Morty" />);
    expect(
      screen.getByText('No results found for "Morty"')
    ).toBeInTheDocument();
  });

  test('Displays "Please enter a search query" when the query is empty and the result is empty.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [],
        info: {
          count: 100,
          pages: 10,
          current: 5,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: '',
    });

    render(<ResultList searchQuery="" />);
    expect(screen.getByText('Please enter a search query')).toBeInTheDocument();
  });

  test('Renders the list of results and pagination when data is available', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [{ id: 1, name: 'Rick Sanchez' }],
        info: {
          count: 20,
          pages: 10,
          current: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: '',
    });

    render(<ResultList searchQuery="Rick" />);
    expect(screen.getByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('Clicking on a character triggers navigation.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [{ id: 7, name: 'Rick Sanchez' }],
        info: {
          count: 1,
          pages: 1,
          current: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: '',
    });

    render(<ResultList searchQuery="Rick" />);
    screen.getByText('Rick Sanchez').click();

    expect(mockNavigate).toHaveBeenCalledWith('7?page=1');
  });

  test('Pagination calls onPageChange and updates navigation.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [{ id: 1, name: 'Rick Sanchez' }],
        info: {
          count: 20,
          pages: 10,
          current: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: '',
    });

    render(<ResultList searchQuery="Rick" />);
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: 'page=2',
    });
  });

  test.skip('Pagination calls onPageChange and do not updates navigation when the page out of range.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [{ id: 1, name: 'Rick Sanchez' }],
        info: {
          count: 20,
          pages: 10,
          current: 1,
          next: null,
          prev: null,
        },
      },
      isLoading: false,
      error: '',
    });

    render(<ResultList searchQuery="Rick" />);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
