import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <h1>Star Trek Character Search</h1>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
