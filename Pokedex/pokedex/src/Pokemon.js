import React, {Component} from "react";
import './css/pokemon.css'

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pokemon: []
        }
    }

    componentDidMount() {
      // Temporarily hardcoded until we can pass ID from login page
      fetch('/pokemon/0')
        .then(res => res.json())
        .then(pokemon => this.setState({pokemon: pokemon}));
    }

    render() {
        return (
          <div>
            {this.state.pokemon.map(p => (
                <div key={p.id} className="pokemon-card">
                  {
                    p.image ?
                      <img
                        className="pokemon-img"
                        src={p.image}
                        alt={p.name || "pokemon image"} /> : null
                  }
                  <div className="pokemon-info">
                    <div>Name: {p.name}</div>
                    <div>Gender: {p.gender || "Unknown"}</div>
                    <div>Type: {p.type || "Unknown"}</div>
                  </div>
                </div>
            ))}
          </div>
        );
    }
}

export default Pokemon
