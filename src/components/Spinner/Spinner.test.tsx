import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  it('renders spinner component correctly', () => {
    render(<Spinner />);

    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('spinner');

    const spinnerInner = screen.getByTestId('spinner-inner');
    expect(spinnerInner).toBeInTheDocument();
    expect(spinnerInner).toHaveClass('spinner-inner');
  });
});
