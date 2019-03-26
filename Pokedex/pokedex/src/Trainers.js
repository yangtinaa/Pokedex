import React, {Component} from "react";
import InfoCard from './InfoCard';
// import './css/trainers.css'

class Trainers extends Component {
  constructor(props) {
      super(props);
      this.state = {
        // Hardcoded until we can pass current id down from homePage
        id: 0,
        trainers: []
      }
  }

  componentDidMount() {
    fetch('/trainers')
      .then(res => res.json())
      .then(trainers => this.setState({trainers: trainers}));
  }

  render() {
    return (
      <div>
        {this.state.trainers.map(t => {
          if (t.id === 0) {
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
