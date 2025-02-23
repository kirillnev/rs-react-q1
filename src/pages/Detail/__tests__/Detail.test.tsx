import { render, screen } from '@testing-library/react';
import Detail from '../Detail';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as apiSlice from '../../../slices/apiSlice';

vi.mock('react-router-dom');
vi.mock('../../../components/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));
vi.mock('../DetailView', () => ({
  default: ({ onClose }: { onClose: () => void }) => {
    onClose();
    return null;
  },
}));

describe('Detail', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: '1' });
    vi.mocked(useNavigate).mockReturnValue(vi.fn());
    vi.mocked(useLocation).mockReturnValue({
      hash: '',
      key: '',
      pathname: '',
      state: undefined,
      search: '',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('displays a spinner while loading', () => {
    vi.spyOn(apiSlice, 'useGetCharacterDetailsQuery').mockReturnValue({
      data: null,
      isFetching: true,
      error: '',
      refetch: vi.fn(),
    });

    render(<Detail />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('displays an error message in case of an error.', () => {
    vi.spyOn(apiSlice, 'useGetCharacterDetailsQuery').mockReturnValue({
      data: null,
      isFetching: false,
      error: 'Some error',
      refetch: vi.fn(),
    });

    render(<Detail />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  test('Call navigate when onClose', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.spyOn(apiSlice, 'useGetCharacterDetailsQuery').mockReturnValue({
      data: { id: 1, name: 'Test Character' },
      isFetching: false,
      error: '',
      refetch: vi.fn(),
    });

    vi.mocked(useLocation).mockReturnValue({
      hash: '',
      key: '',
      pathname: '/1',
      state: undefined,
      search: '?page=1',
    });

    render(<Detail />);

    expect(mockNavigate).toHaveBeenCalledWith('/?page=1');
  });
});
