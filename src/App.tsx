import { Component } from 'react';
import Search from './components/Search';
import ResultsList from './components/ResultsList';
import { Character } from './types';
import { searchCharacters } from './services/api';

class App extends Component {
  state = {
    throwError: false,
    searchTerm: localStorage.getItem('searchTerm') || '',
    isLoading: false,
    results: [] as Character[],
  };

  componentDidMount() {
    this.handleSearch(this.state.searchTerm);
  }

  handleErrorClick = () => {
    this.setState({ throwError: true });
  };

  handleSearch = async (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    this.setState({ isLoading: true, searchTerm: trimmedSearchTerm });

    localStorage.setItem('searchTerm', trimmedSearchTerm);

    try {
      const results = await searchCharacters(trimmedSearchTerm);
      this.setState({ results, isLoading: false });
    } catch (error) {
      this.setState({ results: [], isLoading: false });
      throw error;
    }
  };

  render() {
    const { throwError, searchTerm, isLoading, results } = this.state;

    if (throwError) {
      throw new Error('Test error');
    }

    return (
      <div className="app">
        <h1>Star Trek Character Search</h1>
        <Search
          searchTerm={searchTerm}
          onSearch={this.handleSearch}
          isLoading={isLoading}
        />
        <ResultsList results={results} isLoading={isLoading} />
        <button onClick={this.handleErrorClick} className="error-button">
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
