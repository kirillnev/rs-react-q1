import { render, screen } from '@testing-library/react';
import LayoutView from './LayoutView';
import ResultListContainer from '../ResultList/ResultList';

vi.mock('../Search/Search', () => ({
  default: vi.fn(({ onSearch }) => {
    onSearch('mocked query');
    return <div data-testid="search-mock" />;
  }),
}));

vi.mock('../ResultList/ResultList', () => ({
  default: vi.fn(() => <div data-testid="result-list-mock" />),
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet-mock" />,
}));

describe('LayoutView Component', () => {
  const mockOnSearch = vi.fn();
  const mockOnListClick = vi.fn();
  const searchQuery = 'test query';

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly', () => {
    render(
      <LayoutView
        searchQuery={searchQuery}
        onSearch={mockOnSearch}
        onListClick={mockOnListClick}
      />
    );

    expect(screen.getByTestId('search-mock')).toBeInTheDocument();
    expect(screen.getByTestId('result-list-mock')).toBeInTheDocument();
    expect(screen.getByTestId('outlet-mock')).toBeInTheDocument();
  });

  test('passes correct props to ResultListContainer', () => {
    render(
      <LayoutView
        searchQuery={searchQuery}
        onSearch={mockOnSearch}
        onListClick={mockOnListClick}
      />
    );

    expect(ResultListContainer).toHaveBeenCalledWith(
      { searchQuery },
      expect.anything()
    );
  });

  test('calls onSearch when Search triggers input event', () => {
    render(
      <LayoutView
        searchQuery={searchQuery}
        onSearch={mockOnSearch}
        onListClick={mockOnListClick}
      />
    );

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('mocked query');
  });

  test('calls onListClick when clicking on result list', () => {
    render(
      <LayoutView
        searchQuery={searchQuery}
        onSearch={mockOnSearch}
        onListClick={mockOnListClick}
      />
    );

    screen.getByTestId('result-list-mock').click();
    expect(mockOnListClick).toHaveBeenCalledTimes(1);
  });
});
