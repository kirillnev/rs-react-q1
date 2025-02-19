import { fireEvent, render, screen } from '@testing-library/react';
import Layout from './Layout';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

vi.mock('react-router-dom');
vi.mock('../../hooks/useLocalStorage.ts');
vi.mock('../LayoutView/LayoutView', () => ({
  default: ({
    onListClick,
    onSearch,
  }: {
    onListClick: (e: React.MouseEvent) => void;
    onSearch: (q: string) => void;
  }) => (
    <div>
      <button
        data-testid="search-button"
        onClick={() => onSearch('new search')}
      >
        Search
      </button>
      <button data-testid="list-container" onClick={onListClick}>
        List
      </button>
    </div>
  ),
}));

describe('Layout', () => {
  const mockNavigate = vi.fn();
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    vi.mocked(useLocalStorage).mockReturnValue([
      'test query',
      mockSetSearchQuery,
    ]);
    vi.mocked(useLocation).mockReturnValue({
      hash: '',
      key: '',
      pathname: '/',
      state: undefined,
      search: '?page=1',
    });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('?page=1'),
      vi.fn(),
    ]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('updates search query and navigates on search', () => {
    render(<Layout />);
    fireEvent.click(screen.getByTestId('search-button'));
    expect(mockSetSearchQuery).toHaveBeenCalledWith('new search');
    expect(mockNavigate).toHaveBeenCalledWith('?page=1', { replace: true });
  });

  test('navigates on list click when event target matches currentTarget', () => {
    render(<Layout />);
    fireEvent.click(screen.getByTestId('list-container'));
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '',
      search: 'page=1',
    });
  });
});
