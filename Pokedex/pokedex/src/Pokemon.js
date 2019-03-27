import React, {Component} from "react";
import './css/pokemon.css'

class Pokemon extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userId: this.props.id
        };
    }

    componentDidMount() {
      fetch('/pokemon/' + this.state.userId)
        .then(res => res.json())
        .then(data => this._processData(data));
    }

    _processData(data) {
      const pokemon = {};

      let i;
      for (i = 0; i < data.length; i++) {
        const {id, name, type, image, moveName, powerPoint} = data[i];
        if (!pokemon[id]) {
          pokemon[id] = {
            id,
            name,
            type,
            image,
            moves: [],
          }

          if (moveName || powerPoint) {
            pokemon[id].moves.push({moveName, powerPoint});
          }
        } else {
          pokemon[id].moves.push({moveName, powerPoint});
        }
      }

      this.setState({pokemon: pokemon});
    }

    render() {
      if (!this.state.pokemon || Object.values(this.state.pokemon).length === 0) {
        return <div>You have no captured pokemon!</div>;
      }
      
      return (
        <div>
          {Object.values(this.state.pokemon).map(p => (
              <div key={p.id} className="pokemon-container">
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
                {p.moves.length === 0 ? null :
                  <div style={{marginLeft: "20px"}}>
                    <div style={{marginBottom: "10px"}}>Moves:</div>
                    {p.moves.map(m => (
                      <div key={m.moveName} style={{marginBottom: "5px"}}>
                        {m.moveName ? <div>Name: {m.moveName}</div> : null}
                        {m.powerPoint ? <div>Power Point: {m.powerPoint}</div> : null}
                      </div>
                    ))}
                  </div>
                }
              </div>
          ))}
        </div>
      );
    }
}

export default Pokemon
