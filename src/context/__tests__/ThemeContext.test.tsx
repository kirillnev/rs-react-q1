import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import ThemeContext, { ThemeProvider } from '../ThemeContext';
import { ThemeContextType } from '../../types';

const TestComponent = () => {
  const context = useContext(ThemeContext) as ThemeContextType;

  return (
    <div>
      <span data-testid="theme-value">{context.theme}</span>
      <button onClick={context.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('should render children', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('should provide light theme by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });

  test('should toggle theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');

    fireEvent.click(button);
    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
  });
});
