import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from '../Flyout';
import * as helper from '../helper';
import { Character } from '../../../types';
import { unselectAll } from '../../../slices/selectedSlice';

const mockDispatch = vi.fn();
let mockSelectedCharacters: Character[] = [];

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => ({ selectedCharacters: mockSelectedCharacters }),
}));

vi.mock('../helper', () => ({
  generateCsvUrl: vi.fn(),
}));

const mockRevokeObjectURL = vi.fn();
window.URL.revokeObjectURL = mockRevokeObjectURL;

describe('Flyout', () => {
  const mockUrl = 'blob:http://localhost:3000/mock-url';

  beforeEach(() => {
    vi.clearAllMocks();
    mockSelectedCharacters = [];
    vi.mocked(helper.generateCsvUrl).mockReturnValue(mockUrl);
  });

  test('should not render when no characters are selected', () => {
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
    expect(mockRevokeObjectURL).not.toHaveBeenCalled();
  });

  test('should render when characters are selected', () => {
    mockSelectedCharacters = [
      { id: 1, name: 'Rick' },
      { id: 2, name: 'Morty' },
    ];

    render(<Flyout />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download all')).toBeInTheDocument();
  });

  test('should dispatch unselectAll action when clicking "Unselect all"', () => {
    mockSelectedCharacters = [{ id: 1, name: 'Rick' }];

    render(<Flyout />);

    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });

  test('should generate CSV URL when selected characters change', () => {
    mockSelectedCharacters = [{ id: 1, name: 'Rick' }];

    render(<Flyout />);

    expect(helper.generateCsvUrl).toHaveBeenCalledWith(mockSelectedCharacters);

    const downloadLink = screen.getByRole('link');
    expect(downloadLink).toHaveAttribute('href', mockUrl);
    expect(downloadLink).toHaveAttribute('download', '1_characters.csv');
  });

  test('should cleanup CSV URL on unmount', () => {
    mockSelectedCharacters = [{ id: 1, name: 'Rick' }];

    const { unmount } = render(<Flyout />);
    unmount();

    expect(mockRevokeObjectURL).toHaveBeenCalledWith(mockUrl);
  });

  test('should handle error case when CSV URL generation fails', () => {
    mockSelectedCharacters = [{ id: 1, name: 'Rick' }];
    vi.mocked(helper.generateCsvUrl).mockReturnValue('');

    render(<Flyout />);

    expect(screen.queryByText('Download all')).not.toBeInTheDocument();
  });
});
