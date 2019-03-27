import React, {Component} from "react";
import './css/pokemon.css'

class PokemonCard extends Component {
  render() {
    const {p} = this.props;

    return (
        <div className="pokemon-card">
          {
            p.image ?
              <img
                className="pokemon-img"
                src={p.image}
                alt={p.name || "pokemon image"} /> : null
          }
          <div className="pokemon-info">
            <div>Name: {p.name}</div>
            <div>Type: {p.type || "Unknown"}</div>
          </div>
        </div>
    );
  }
}

export default PokemonCard
