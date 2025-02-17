import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import { describe } from 'vitest';

describe('NotFound component', () => {
  test('consist of link to the main page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page not found')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Go to the main page' })
    ).toBeInTheDocument();
  });
});
