import { render, screen } from '@testing-library/react';
import LayoutView from '../LayoutView';
import ResultList from '../../ResultList';

vi.mock('../../Search', () => ({
  default: vi.fn(({ onSearch }) => {
    onSearch('mocked query');
    return <div data-testid="search-mock" />;
  }),
}));

vi.mock('../../ResultList', () => ({
  default: vi.fn(() => <div data-testid="result-list-mock" />),
}));

vi.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet-mock" />,
}));

const mockTheme = vi.fn(() => 'light');

vi.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme() }),
}));

describe('LayoutView Component', () => {
  const mockOnSearch = vi.fn();
  const searchQuery = 'test query';

  afterEach(() => {
    vi.clearAllMocks();
    mockTheme.mockReturnValue('light');
  });

  test('renders correctly', () => {
    render(<LayoutView searchQuery={searchQuery} onSearch={mockOnSearch} />);

    expect(screen.getByTestId('search-mock')).toBeInTheDocument();
    expect(screen.getByTestId('result-list-mock')).toBeInTheDocument();
    expect(screen.getByTestId('outlet-mock')).toBeInTheDocument();
  });

  test('passes correct props to ResultList', () => {
    render(<LayoutView searchQuery={searchQuery} onSearch={mockOnSearch} />);

    expect(ResultList).toHaveBeenCalledWith({ searchQuery }, expect.anything());
  });

  test('calls onSearch when Search triggers input event', () => {
    render(<LayoutView searchQuery={searchQuery} onSearch={mockOnSearch} />);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('mocked query');
  });

  test('adds dark class when theme is dark', () => {
    mockTheme.mockReturnValue('dark');

    render(<LayoutView searchQuery={searchQuery} onSearch={mockOnSearch} />);

    const container = screen.getByTestId('layout-container');
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('dark');
  });
});
