import React, {Component} from "react";
import './css/pokemon.css'

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          encountered: [],
          allPokemon: [],
          types: [],
          filter: "All",
        };
    }

    componentDidMount() {
      // Temporarily hardcoded userId
      const encounteredReq = fetch('/encountered/0').then(res => res.json());
      const allPokemonReq = fetch('/pokemon').then(res => res.json());
      const typeReq = fetch('/pokemonTypes').then(res => res.json());

      Promise.all([encounteredReq,allPokemonReq, typeReq]).then(values =>
        this._initializeData(values[0], values[1], values[2])
      )
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.filter !== this.state.filter) {
        // Temporarily hardcoded userId
        const encounteredReq = this.state.filter === 'All' ?
          fetch('/encountered/0').then(res => res.json()) :
          fetch('/encountered/0/' + this.state.filter).then(res => res.json());
        const allPokemonReq = this.state.filter === 'All' ?
          fetch('/pokemon').then(res => res.json()) :
          fetch('/filteredPokemon/' + this.state.filter).then(res => res.json());

        Promise.all([encounteredReq,allPokemonReq]).then(values =>
          this._updateData(values[0], values[1])
        )
      }
    }

    _initializeData(data, totalData, typesData) {
      const {encountered, allPokemon} = this._processData(data, totalData);
      const types = [...new Set(typesData.map(t => t.type))];

      this.setState({encountered, allPokemon, types});
    }

    _updateData(data, totalData) {
      const {encountered, allPokemon} = this._processData(data, totalData);
      this.setState({encountered, allPokemon});
    }

    _processData(data, totalData) {
      const encounteredData = data.map(d => d.pokemonName);
      const encountered = [];
      const allPokemon = [];

      let i;
      for(i = 0; i < totalData.length; i++) {
        encounteredData.includes(totalData[i].name) ?
          encountered.push(totalData[i]) :
          allPokemon.push(totalData[i]);
      }

      return {encountered, allPokemon};
    }

    render() {
      return (
        <div>
          <div style={{display: "flex", flexDirection: "row", marginBottom: "20px"}}>
            <div style={{marginRight: "10px"}}>Filters:</div>
            <select id="type"
                    name="type"
                    value={this.state.filter}
                    onChange={event => this.setState({filter: event.target.value})}>
              <option value="All">All</option>
              {this.state.types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          {this.state.encountered.length === 0 ? null :
            <div>
              <div style={{marginBottom: "10px"}}>Encountered Pokemon:</div>
              {this.state.encountered.map(p => (
                <div key={p.name} className="pokemon-card">
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
              ))}
            </div>
          }
          {this.state.allPokemon.length === 0 ? null :
            <div>
              <div style={{marginBottom: "10px", marginTop: "20px"}}>New Pokemon:</div>
              {this.state.allPokemon.map(p => (
                <div key={p.name} style={{position: "relative"}}>
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
                  <div className="overlay">
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      );
    }
}

export default Explore
