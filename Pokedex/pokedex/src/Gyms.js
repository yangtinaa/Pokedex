import React, {Component} from "react";

class Gyms extends Component {
  constructor(props) {
      super(props);
      this.state = {
        gyms: []
      }
  }

  componentDidMount() {
    fetch('/gyms')
      .then(res => res.json())
      .then(gyms => this.setState({gyms: gyms}));
  }

  render() {
    return (
      <div>
        {this.state.gyms.map(g => {
          const {gymName, badgeName, townName, badgeImage, name} = g;
          return (
            <div key={gymName + name} className="about" style={{border: "1px solid grey", marginBottom: "10px", padding: "10px"}}>
              {
                badgeImage ?
                  <img
                    className="about-img"
                    src={badgeImage}
                    alt={gymName || "gym image"} /> : null
              }
              <div className="about-info">
                <div>Gym Name: {gymName}</div>
                <div>Location: {townName || "Unknown"}</div>
                <div>Badge Name: {badgeName || "Unknown"}</div>
                <div>Gym Leader: {name || "Unknown"}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gyms
