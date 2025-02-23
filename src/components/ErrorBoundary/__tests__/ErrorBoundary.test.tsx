import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary.tsx';

const ThrowError = () => {
  throw new Error('Test error');
};

const NormalComponent = () => {
  return <div>Normal component</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal component')).toBeInTheDocument();
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
    expect(screen.getByText('Test error')).toBeInTheDocument();
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
