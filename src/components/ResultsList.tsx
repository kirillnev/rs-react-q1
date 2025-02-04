import { Component } from 'react';
import { Character } from '../types';
import ResultCard from './ResultCard';

interface Props {
  results: Character[];
  isLoading: boolean;
}

class ResultsList extends Component<Props> {
  render() {
    const { results, isLoading } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="results-container">
        {results.map((character) => (
          <ResultCard key={character.uid} character={character} />
        ))}
      </div>
    );
  }
}

export default ResultsList;
