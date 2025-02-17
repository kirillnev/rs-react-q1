import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../Search.tsx';

describe('Search', () => {
  const mockOnSearch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders input with initialQuery', () => {
    render(<Search onSearch={mockOnSearch} initialQuery="Rick" />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Rick');
  });

  test('updates input value on change', () => {
    render(<Search onSearch={mockOnSearch} initialQuery="" />);

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input).toHaveValue('Morty');
  });

  test('calls onSearch with trimmed input value on submit', () => {
    render(<Search onSearch={mockOnSearch} initialQuery="  Jerry " />);

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('Jerry');
  });
});
