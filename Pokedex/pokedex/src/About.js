import React, {Component} from "react";
import InfoCard from './InfoCard'
import './css/about.css'

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
          info: null,
          edit: null,
          editing: false,
          pokemonCount: null,
          towns: [],
          userId: this.props.id,
        }
    }

    componentDidMount() {
      const infoReq = fetch('/user/' + this.state.userId).then(res => res.json());
      const townsReq = fetch('/towns').then(res => res.json());
      const countReq = fetch('/pokemonCount/' + this.state.userId).then(res => res.json());

      Promise.all([infoReq, townsReq, countReq]).then(values =>
        this._processData(values[0], values[1], values[2])
      )
    }

    _processData(infoRes, townsRes, countRes) {
      const towns = townsRes.map(t => t.name);
      const info = infoRes[0];
      const pokemonCount = countRes[0]['COUNT(*)'];

      this.setState({info, edit: info, towns, pokemonCount});
    }

    _handleFormChange(newEditState) {
      this.setState({edit: newEditState});
    }

    handleInputChange(event) {
      const {value, name} = event.target;

      this.setState({
        edit: {
          ...this.state.edit,
          [name]: value
        }
      });
    }

    _submitChanges() {
      if (this.state.edit.name !== '') {
        const gender = this.state.edit.gender === 'Unknown' ? null : this.state.edit.gender;
        fetch('/user/' + this.state.userId, {
          method: 'post',
          body: JSON.stringify({...this.state.edit, gender}),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(res => console.log(res.json()));

        this.setState({editing: false, info: this.state.edit});
      }
    }

    _renderInfoCard() {
      return (
        <div className="about-container">
          <InfoCard {...this.state.info} pokemonCount={this.state.pokemonCount} />
          <button onClick={() => this.setState({editing: true})}>Edit</button>
        </div>
      );
    }

    _renderEditCard() {
      const {edit, info} = this.state;
      return (
        <form className="about-container">
          <div className="about">
            {
              info.image ?
                <img
                  className="about-img"
                  src={info.image}
                  alt={edit.name || "user image"} /> : null
            }
            <div className="about-info">
              <label>
                  Name:
                  <input type="text"
                         id="name"
                         name="name"
                         required="required"
                         value={edit.name}
                         onChange={event => this.handleInputChange(event)} />
              </label>
              <label>
                  Age:
                  <input type="number"
                         name="age"
                         id="age"
                         value={edit.age || "Unknown"}
                         onChange={event => this.handleInputChange(event)} />
              </label>
              <label>
                  Gender:
                  <select id="gender"
                          name="gender"
                          value={edit.gender || "Unknown"}
                          onChange={event => this.handleInputChange(event)}>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Unknown">Unknown</option>
                  </select>
              </label>
              <label>
                  Hometown:
                  <select id="hometown"
                          name="hometown"
                          value={edit.hometown || "Unknown"}
                          onChange={event => this.handleInputChange(event)}>
                    {this.state.towns.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
              </label>
            </div>
          </div>
          <div className="edit-buttons">
            <input type="submit" value="Submit" style={{marginBottom: "5px"}} onClick={() => this._submitChanges()} />
            <button onClick={() => this.setState({editing: false, edit: info})}>
              Cancel
            </button>
          </div>
        </form>
      );
    }

    render() {
      if (this.state.info) {
        return this.state.editing ?
          this._renderEditCard() :
          this._renderInfoCard();
      }

      return null;
    }
}

export default About
