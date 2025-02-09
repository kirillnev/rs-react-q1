import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../../components/Spinner';

describe('Spinner Component', () => {
  it('renders spinner component correctly', () => {
    render(<Spinner />);

    // Проверяем, что основной контейнер спиннера существует
    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('spinner');

    // Проверяем, что внутренний элемент спиннера существует
    const spinnerInner = screen.getByTestId('spinner-inner');
    expect(spinnerInner).toBeInTheDocument();
    expect(spinnerInner).toHaveClass('spinner-inner');
  });
});
