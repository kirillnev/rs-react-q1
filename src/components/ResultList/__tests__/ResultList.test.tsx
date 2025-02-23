import { render, screen } from '@testing-library/react';
import ResultList from '../ResultList';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetCharactersQuery } from '../../../slices/apiSlice';
import * as helper from '../helper';
import { Character } from '../../../types';

vi.mock('react-router-dom');
vi.mock('../../../slices/apiSlice');
vi.mock('../helper');
vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: () => [],
}));

vi.mock('../../Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('../../Flyout', () => ({
  default: () => <div data-testid="flyout">Flyout</div>,
}));

vi.mock('../ResultListView', () => ({
  default: ({
    characters,
    onCharacterClick,
  }: {
    characters: Character[];
    onCharacterClick: (id: number) => void;
  }) => (
    <div data-testid="result-list">
      {characters.map((char) => (
        <div
          key={char.id}
          onClick={() => onCharacterClick(char.id)}
          data-testid={`character-${char.id}`}
        >
          {char.name}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../Pagination', () => ({
  default: ({ onPageChange }: { onPageChange: (p: number) => void }) => {
    onPageChange(2);
    return <div data-testid="pagination">Pagination</div>;
  },
}));

describe('ResultList', () => {
  const mockNavigate = vi.fn();
  const mockOnPageChange = vi.fn();

  const defaultSearchParams = new URLSearchParams('?page=1');
  const defaultLocation = {
    pathname: '/',
    search: '?page=1',
    hash: '',
    state: null,
    key: 'default',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useSearchParams).mockReturnValue([defaultSearchParams, vi.fn()]);
    vi.mocked(useLocation).mockReturnValue(defaultLocation);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(helper.onPageChange).mockImplementation(mockOnPageChange);

    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: null,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  test('should show loading spinner when fetching data', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: null,
      isFetching: true,
      error: null,
      refetch: vi.fn(),
    });

    render(<ResultList searchQuery="Rick" />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should show error message when API returns error', () => {
    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: null,
      isFetching: false,
      error: new Error('API Error'),
      refetch: vi.fn(),
    });

    render(<ResultList searchQuery="Rick" />);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  test('should render characters list and pagination when data is available', () => {
    const mockData = {
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' },
      ],
      info: {
        count: 20,
        pages: 2,
        next: 'next-url',
        prev: null,
      },
    };

    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<ResultList searchQuery="Rick" />);

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  test('should navigate to character details when character is clicked', () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
    };

    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<ResultList searchQuery="Rick" />);

    screen.getByTestId('character-1').click();
    expect(mockNavigate).toHaveBeenCalledWith('1?page=1');
  });

  test('should call onPageChange helper when pagination is clicked', () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
      info: {
        count: 20,
        pages: 2,
        next: 'next-url',
        prev: null,
      },
    };

    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<ResultList searchQuery="Rick" />);

    screen.getByTestId('pagination').click();

    expect(mockOnPageChange).toHaveBeenCalledWith(
      2,
      mockData,
      defaultLocation,
      mockNavigate
    );
  });

  test('should not render pagination if only one page exists', () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick Sanchez' }],
      info: {
        count: 1,
        pages: 1,
        next: null,
        prev: null,
      },
    };

    vi.mocked(useGetCharactersQuery).mockReturnValue({
      data: mockData,
      isFetching: false,
      error: null,
      refetch: vi.fn(),
    });

    render(<ResultList searchQuery="Rick" />);

    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  test('should use correct page from URL params', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=3'),
      vi.fn(),
    ]);

    render(<ResultList searchQuery="Rick" />);

    expect(useGetCharactersQuery).toHaveBeenCalledWith({
      page: 3,
      searchQuery: 'Rick',
    });
  });

  test('should use uncorrect page from URL params', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=abc'),
      vi.fn(),
    ]);

    render(<ResultList searchQuery="Rick" />);

    expect(useGetCharactersQuery).toHaveBeenCalledWith({
      page: 1,
      searchQuery: 'Rick',
    });
  });
});
