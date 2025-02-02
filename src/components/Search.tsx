import React, { Component } from 'react';
import { Character, SearchState } from '../types';

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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.searchTerm.trim();
    this.setState({ isLoading: true });

    localStorage.setItem(this.LOCAL_STORAGE_KEY, trimmedSearchTerm);

    // API-request mock
    setTimeout(() => {
      const mockResults: Character[] = [
        {
          uid: '1234',
          name: 'James T. Kirk',
          gender: 'M',
          height: 180,
          weight: 77,
          deceased: false,
        },
        {
          uid: '5678',
          name: 'Spock',
          gender: 'M',
          height: 185,
          weight: 80,
          deceased: false,
        },
      ];

      this.setState({
        results: mockResults,
        isLoading: false,
      });
    }, 1000);
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
            {isLoading ? 'Searching...' : 'Find'}
          </button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="results-container">
            {results.map((character) => (
              <div key={character.uid} className="result-item">
                <h3>{character.name}</h3>
                <div className="character-info">
                  <p>gender: {character.gender}</p>
                  <p>height: {character.height}</p>
                  <p>weight: {character.weight}</p>
                  <p>deceased: {character.deceased ? 'Dead' : 'Alive'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
