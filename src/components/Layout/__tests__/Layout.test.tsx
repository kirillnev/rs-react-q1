import { fireEvent, render, screen } from '@testing-library/react';
import Layout from '../Layout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../../../hooks/useLocalStorage';

vi.mock('react-router-dom');
vi.mock('../../../hooks/useLocalStorage');
vi.mock('../LayoutView', () => ({
  default: ({ onSearch }: { onSearch: (q: string) => void }) => (
    <div>
      <button
        data-testid="search-button"
        onClick={() => onSearch('new search')}
      >
        Search
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
});
