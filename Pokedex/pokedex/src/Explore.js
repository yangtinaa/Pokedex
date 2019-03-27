import React, {Component} from "react";
import './css/pokemon.css'

import PokemonCard from './PokemonCard';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
          encountered: [],
          allPokemon: [],
          types: [],
          filter: "All",
          displayImage: true,
          displayType: true,
          // Temporarily hardcoded userId
          userId: 0,
        };
    }

    componentDidMount() {
      const encounteredReq = fetch('/encountered/' + this.state.userId).then(res => res.json());
      const allPokemonReq = fetch('/pokemon').then(res => res.json());
      const typeReq = fetch('/pokemonTypes').then(res => res.json());

      Promise.all([encounteredReq, allPokemonReq, typeReq]).then(values =>
        this._initializeData(values[0], values[1], values[2])
      )
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.filter !== this.state.filter) {
        const encounteredReqPath = this.state.filter === 'All' ?
          '/encountered/' + this.state.userId :
          '/encountered/' + this.state.userId + '/' + this.state.filter;

        const allPokemonReqPath = this.state.filter === 'All' ?
          '/pokemon' :
          '/filteredPokemon/' + this.state.filter;

        const encounteredReq = fetch(encounteredReqPath).then(res => res.json());
        const allPokemonReq = fetch(allPokemonReqPath).then(res => res.json());

        Promise.all([encounteredReq, allPokemonReq]).then(values =>
          this._updateData(values[0], values[1])
        )
      }

      if (prevState.displayType !== this.state.displayType
            || prevState.displayImage !== this.state.displayImage) {

        const reqPath = this.state.displayType && this.state.displayImage ?
          '/pokemon' :
          this.state.displayType ?
            '/pokemonTypeOnly' :
            this.state.displayImage ?
              '/pokemonImageOnly' :
              '/pokemonNameOnly';

        fetch(reqPath)
          .then(res => res.json())
          .then(allPokemon => {
            const encountered = this.state.encountered.map(e => ({pokemonName: e.name}));
            return this._updateData(encountered, allPokemon);
          })
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

    _handleEncounter(pokemon) {
      const {encountered, allPokemon} = this.state;
      fetch('/encounter/' + this.state.userId + '/' + pokemon.name, {
        method: 'post',
      }).then(res => console.log(res.json()));

      encountered.push(pokemon);
      this.setState({encountered, allPokemon: allPokemon.filter(p => p.name !== pokemon.name)});
    }

    _handleRemove(pokemon) {
      const {encountered, allPokemon} = this.state;
      fetch('/removeEncounter/' + this.state.userId + '/' + pokemon.name, {
        method: 'post',
      }).then(res => console.log(res.json()));

      allPokemon.push(pokemon);
      this.setState({encountered: encountered.filter(p => p.name !== pokemon.name), allPokemon});
    }

    _handleChange(event) {
      const {name, checked} = event.target;

      if (name === 'type') {
        this.setState({displayType: checked});
      } else if (name === 'image') {
        this.setState({displayImage: checked});
      }
    }

    _renderToolBar() {
      return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px"}}>
          <div style={{display: "flex", flexDirection: "row"}}>
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
          <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{marginRight: "10px"}}>View:</div>
            Image
            <input style={{marginRight: "10px"}}
                   type="checkbox"
                   name="image"
                   checked={this.state.displayImage}
                   onChange={event => this._handleChange(event)} />
            Type
            <input type="checkbox"
                   name="type"
                   checked={this.state.displayType}
                   onChange={event => this._handleChange(event)} />
          </div>
        </div>
      )
    }

    render() {
      return (
        <div>
          {this._renderToolBar()}
          {this.state.encountered.length === 0 ? null :
            <div>
              <div style={{marginBottom: "10px"}}>Encountered Pokemon:</div>
              {this.state.encountered.map(p => (
                <div key={p.name} className="pokemon-container pokemon-explore">
                  <PokemonCard p={p} />
                  <button className="pokemon-card-button"
                          onClick={() => this._handleRemove(p)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          }
          {this.state.allPokemon.length === 0 ? null :
            <div>
              <div style={{marginBottom: "10px", marginTop: "20px"}}>New Pokemon:</div>
              {this.state.allPokemon.map(p => (
                <div key={p.name} style={{position: "relative"}}>
                  <div className="pokemon-container pokemon-explore">
                    <PokemonCard p={p} />
                    <button className="pokemon-card-button"
                            onClick={() => this._handleEncounter(p)}>
                      Encounter
                    </button>
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
