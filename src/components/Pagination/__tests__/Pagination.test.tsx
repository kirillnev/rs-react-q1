import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../Pagination.tsx';
import { PageData } from '../../../types.ts';

describe('Pagination Component', () => {
  test('renders correctly with given page data', () => {
    const mockPageData: PageData = {
      count: 100,
      pages: 10,
      current: 2,
    };
    const mockOnPageChange = vi.fn();
    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );
    expect(screen.getByText('Page 2 of 10')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeEnabled();
    expect(screen.getByText('Next')).toBeEnabled();
  });

  test('disables "Next" button on the last page', () => {
    const mockPageData: PageData = {
      count: 100,
      pages: 10,
      current: 10,
    };
    const mockOnPageChange = vi.fn();
    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('disables "Previous" button on the first page', () => {
    const mockPageData: PageData = {
      count: 100,
      pages: 10,
      current: 1,
    };
    const mockOnPageChange = vi.fn();
    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('calls onPageChange with next page number when "Next" is clicked', () => {
    const mockPageData: PageData = {
      count: 100,
      pages: 5,
      current: 1,
    };
    const mockOnPageChange = vi.fn();

    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Next'));

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with prev page number when "Previous" is clicked', () => {
    const mockPageData: PageData = {
      count: 100,
      pages: 5,
      current: 4,
    };
    const mockOnPageChange = vi.fn();

    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Previous'));

    expect(mockOnPageChange).toHaveBeenCalledTimes(1);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test('does not call onPageChange when clicking disabled "Next" button', () => {
    const mockPageData: PageData = { pages: 5, count: 100, current: 5 };
    const mockOnPageChange = vi.fn();

    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Next'));

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test('does not call onPageChange when clicking disabled "Previous" button', () => {
    const mockPageData: PageData = { pages: 5, count: 100, current: 1 };
    const mockOnPageChange = vi.fn();

    render(
      <Pagination pageData={mockPageData} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Previous'));

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
