import { Component } from 'react';
import { SearchState } from '../types';
import { searchCharacters } from '../services/api';
import ResultsList from './ResultsList';
import Spinner from './Spinner';

class Search extends Component<object, SearchState> {
  private readonly LOCAL_STORAGE_KEY = 'searchTerm';

  constructor(props: object) {
    super(props);

    this.state = {
      searchTerm: localStorage.getItem(this.LOCAL_STORAGE_KEY) || '',
      isLoading: false,
      results: [],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = async () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.setState({ isLoading: true });

    localStorage.setItem(this.LOCAL_STORAGE_KEY, trimmedSearchTerm);

    try {
      const results = await searchCharacters(trimmedSearchTerm);
      this.setState({ results, isLoading: false });
    } catch (error) {
      this.setState({
        results: [],
        isLoading: false,
      });
      throw error;
    }
  };

  render() {
    const { searchTerm, isLoading, results } = this.state;

    return (
      <div>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
            placeholder="Search"
            className="search-input"
          />
          <button
            onClick={this.handleSearch}
            disabled={isLoading}
            className="search-button"
          >
            {isLoading ? <Spinner /> : 'Find'}
          </button>
        </div>

        <ResultsList results={results} isLoading={isLoading} />
      </div>
    );
  }
}

export default Search;
