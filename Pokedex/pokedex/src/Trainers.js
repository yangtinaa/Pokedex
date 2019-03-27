import React, {Component} from "react";
import InfoCard from './InfoCard';

class Trainers extends Component {
  constructor(props) {
      super(props);
      this.state = {
        id: this.props.id,
        trainers: []
      }
  }

  componentDidMount() {
    const trainersReq = fetch('/trainers').then(res => res.json());
    const pokemonCountsReq = fetch('/pokemonCount').then(res => res.json());

    Promise.all([trainersReq, pokemonCountsReq]).then(values =>
      this._processData(values[0], values[1])
    )
  }

  _processData(trainersRes, pokemonCountRes) {
    const trainers = {};

    let i;
    for (i = 0; i < trainersRes.length; i++) {
      const t = trainersRes[i];
      trainers[t.id] = t;
    }

    let j;
    for (j = 0; j < pokemonCountRes.length; j++) {
      const count = pokemonCountRes[j];
      trainers[count.id].pokemonCount = count['COUNT(*)'];
    }

    this.setState({trainers: Object.values(trainers)});
  }

  render() {
    return (
      <div>
        {this.state.trainers.map(t => {
          if (t.id === this.state.id) {
            return null;
          }

          const props = {...t, style: {border: "1px solid grey", marginBottom: "10px", padding: "10px"}}
          return <InfoCard {...props} key={props.id} />
        })}
      </div>
    );
  }
}

export default Trainers
