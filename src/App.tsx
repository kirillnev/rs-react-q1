import { Component } from 'react';
import Search from './components/Search';

class App extends Component {
  state = {
    throwError: false,
  };

  handleErrorClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    const { throwError } = this.state;

    if (throwError) {
      throw new Error('Test error');
    }

    return (
      <div className="app">
        <h1>Star Trek Character Search</h1>
        <Search />
        <button onClick={this.handleErrorClick} className="error-button">
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
