import { describe, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Detail from '../Detail.tsx';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCharacterDetails } from '../../hooks/useCharacterDetails';

vi.mock('react-router-dom');
vi.mock('../../hooks/useCharacterDetails');
vi.mock('../Spinner', () => ({
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
    vi.mocked(useCharacterDetails).mockReturnValue({
      character: null,
      isLoading: true,
      error: '',
    });
    render(<Detail />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('displays an error message in case of an error.', () => {
    vi.mocked(useCharacterDetails).mockReturnValue({
      character: null,
      isLoading: false,
      error: 'Some error',
    });
    render(<Detail />);
    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Some error');
  });

  test('Return null if characters list is empty', () => {
    vi.mocked(useCharacterDetails).mockReturnValue({
      character: null,
      isLoading: false,
      error: '',
    });

    render(<Detail />);
    expect(screen.getByText('No character data available')).toBeInTheDocument();
  });

  test('Call navigate when onClose', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    vi.mocked(useCharacterDetails).mockReturnValue({
      character: { id: 1, name: 'Test Character' },
      isLoading: false,
      error: '',
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
