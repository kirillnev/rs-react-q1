import { render } from '@testing-library/react';
import ResultList from './ResultList';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useCharacterSearch } from '../../hooks/useCharacterSearch';

vi.mock('react-router-dom');
vi.mock('../../hooks/useCharacterSearch');
vi.mock('../Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));
vi.mock('../ResultListView/ResultListView', () => ({
  default: () => null,
}));

vi.mock('../Pagination/Pagination', () => ({
  default: ({ onPageChange }: { onPageChange: (p: number) => void }) => {
    onPageChange(0);
    return null;
  },
}));

describe('ResultList2', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(''),
      vi.fn(),
    ]);
    vi.mocked(useLocation).mockReturnValue({
      hash: '',
      key: '',
      pathname: '/',
      state: undefined,
      search: '',
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

  test('Pagination calls onPageChange and do not updates navigation when the page out of range.', () => {
    vi.mocked(useCharacterSearch).mockReturnValue({
      charactersData: {
        results: [{ id: 1, name: 'Rick Sanchez' }],
        info: {
          count: 20,
          pages: 10,
          current: 0,
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
