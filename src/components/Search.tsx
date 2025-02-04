import { Component } from 'react';
import Spinner from './Spinner';

interface Props {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  isLoading: boolean;
}

class Search extends Component<Props> {
  state = {
    searchTerm: this.props.searchTerm,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    const { isLoading } = this.props;
    const { searchTerm } = this.state;

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
      </div>
    );
  }
}

export default Search;
