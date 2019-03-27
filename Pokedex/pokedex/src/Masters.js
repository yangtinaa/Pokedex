import React, {Component} from "react";

import InfoCard from './InfoCard';

class Masters extends Component {
  constructor(props) {
      super(props);
      this.state = {
        masters: []
      }
  }

  componentDidMount() {
    fetch('/masters')
      .then(res => res.json())
      .then(masters => this.setState({masters}));
  }
  render() {
    debugger;
    return (
      <div>
        {this.state.masters.map(t => {
          const props = {...t, style: {border: "1px solid grey", marginBottom: "10px", padding: "10px"}}
          return <InfoCard {...props} key={props.id} />
        })}
      </div>
    );
  }
}

export default Masters
