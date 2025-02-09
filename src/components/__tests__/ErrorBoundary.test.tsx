import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/ErrorBoundary';

// Создаем компонент, который будет генерировать ошибку
const ThrowError = () => {
  throw new Error('Тестовая ошибка');
  return null;
};

// Создаем обычный компонент без ошибок
const NormalComponent = () => {
  return <div>Нормальный компонент</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    // Подавляем вывод ошибок в консоль при тестировании
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Нормальный компонент')).toBeInTheDocument();
  });

  it('renders error message when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Something went wrong!'
    );
    expect(screen.getByText('Тестовая ошибка')).toBeInTheDocument();
  });

  it('calls componentDidCatch when error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('has correct accessibility attributes in error state', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const errorContainer = screen.getByRole('alert');
    expect(errorContainer).toHaveAttribute('aria-live', 'assertive');
  });
});
