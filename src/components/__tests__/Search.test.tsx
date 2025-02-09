import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search';

describe('Search Component', () => {
  it('should save search query to localStorage', () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} initialQuery="" />);
    const input = screen.getByPlaceholderText(/search characters/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Yoda' } });
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith('Yoda');
  });

  it('should load search query from localStorage', () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} initialQuery="Darth Vader" />);

    expect(screen.getByDisplayValue('Darth Vader')).toBeInTheDocument();
  });
});
