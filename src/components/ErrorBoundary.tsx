import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error) {
    console.error('Uncaught error:', error);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2 className="error-heading">Something went wrong!</h2>
          <div className="error-details">
            {this.state.error && this.state.error.toString()}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
