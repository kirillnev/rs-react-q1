import { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <h1>Star Trek Character Search</h1>
          <Search />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
