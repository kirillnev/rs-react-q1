import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../../components/Layout';

// Мок для useLocalStorage
vi.mock('../../hooks/useLocalStorage', () => ({
  default: () => ['', vi.fn()],
}));

const renderLayout = () => {
  return render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

describe('Layout Component', () => {
  it('renders search component', () => {
    renderLayout();

    const searchInput = screen.getByPlaceholderText('Search characters...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders results list section', () => {
    renderLayout();

    const resultsList = screen.getByTestId('result-list');
    expect(resultsList).toBeInTheDocument();
  });

  it('renders detail panel section', () => {
    renderLayout();

    const detailPanel = screen.getByTestId('detail-panel');
    expect(detailPanel).toBeInTheDocument();
  });
});
