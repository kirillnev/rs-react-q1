import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import NotFound from '../../components/NotFound';

describe('NotFound Component', () => {
  it('renders not found message correctly', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('404 - Страница не найдена');

    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Перейти на главную');
    expect(link).toHaveAttribute('href', '/');
  });

  it('navigates to home page when link is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/non-existent']}>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'Перейти на главную' });

    await user.click(link);

    expect(window.location.pathname).toBe('/');
  });

  it('has correct accessibility attributes', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const container = screen.getByRole('main');
    expect(container).toHaveAttribute('aria-label', 'Страница не найдена');
  });
});
