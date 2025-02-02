import React, { Component } from 'react';
import { SearchState } from '../types';
import { searchCharacters } from '../services/api';

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
                  {character.gender && <p>gender: {character.gender}</p>}
                  {character.height && <p>height: {character.height}</p>}
                  {character.weight && <p>weight: {character.weight}</p>}
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
