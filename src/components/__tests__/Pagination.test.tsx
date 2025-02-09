import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Pagination total={50} currentPage={1} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Next/i));
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: expect.any(String),
      search: 'page=2',
    });
  });
});
