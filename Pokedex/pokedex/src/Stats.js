import React, {Component} from "react";

class Stats extends Component {
  constructor(props) {
      super(props);
      this.state = {
        stats: []
      }
  }

  componentDidMount() {
    fetch('/stats')
      .then(res => res.json())
      .then(stats => this.setState({stats}));
  }
  render() {
    return (
      <div>
        <div style={{marginBottom: "10px"}}>Trainers who have captured all pokemon:</div>
        {this.state.stats.map(t => (
          <div key={t.id}>{t.name}</div>
        ))}
      </div>
    );
  }
}

export default Stats
