import ResultListView from '../ResultListView.tsx';
import { fireEvent, render, screen } from '@testing-library/react';
import { Character } from '../../../types.ts';

describe('ResultList Component', () => {
  const mockCharacters: Character[] = [
    { id: 1, name: 'Scary Glenn' },
    { id: 2, name: 'Summer Smith' },
    { id: 5, name: 'Abadango Cluster Princess' },
  ];

  test('renders correctly with given data', () => {
    const mockOnCharacterClick = vi.fn();
    render(
      <ResultListView
        characters={mockCharacters}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    expect(screen.getByText('Scary Glenn')).toBeInTheDocument();
    expect(screen.getByText('Summer Smith')).toBeInTheDocument();
    expect(screen.getByText('Abadango Cluster Princess')).toBeInTheDocument();
  });

  test('calls onCharacterClick with correct id when a character is clicked', () => {
    const mockOnCharacterClick = vi.fn();

    render(
      <ResultListView
        characters={mockCharacters}
        onCharacterClick={mockOnCharacterClick}
      />
    );

    fireEvent.click(screen.getByText('Scary Glenn'));

    expect(mockOnCharacterClick).toHaveBeenCalledTimes(1);
    expect(mockOnCharacterClick).toHaveBeenCalledWith(1);
  });
});
