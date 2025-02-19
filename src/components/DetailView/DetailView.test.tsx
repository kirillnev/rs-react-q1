import { render, screen, fireEvent } from '@testing-library/react';
import DetailView from './DetailView';
import { Character } from '../../types';

describe('Detail Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Scary Glenn',
    species: 'Mythological Creature',
    type: 'Monster',
    gender: 'Male',
    status: 'Dead',
    image: 'https://somedomain.com/image.jpg',
  };

  const mockOnClose = vi.fn();

  test('renders character name correctly', () => {
    render(<DetailView character={mockCharacter} onClose={mockOnClose} />);
    expect(screen.getByText('Scary Glenn')).toBeInTheDocument();
    expect(
      screen.getByText('Species: Mythological Creature')
    ).toBeInTheDocument();
    expect(screen.getByText('Type: Monster')).toBeInTheDocument();
    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Status: Dead')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(<DetailView character={mockCharacter} onClose={mockOnClose} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
