import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

describe('Spinner Component', () => {
  it('renders spinner component correctly', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
