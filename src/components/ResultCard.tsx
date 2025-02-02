import { Component } from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
}

class ResultCard extends Component<Props> {
  render() {
    const { character } = this.props;
    const { name, gender, height, weight, deceased } = character;

    return (
      <div className="result-item">
        <h3>{name}</h3>
        <div className="character-info">
          {gender && <p>gender: {gender}</p>}
          {height && <p>height: {height}</p>}
          {weight && <p>weight: {weight}</p>}
          <p>deceased: {deceased ? 'Dead' : 'Alive'}</p>
        </div>
      </div>
    );
  }
}

export default ResultCard;
