import React, {Component} from "react";
import './css/gym.css'

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
      .then(data => this._processData(data));
  }

  _processData(data) {
    const gyms = {};

    let i;
    for (i = 0; i < data.length; i++) {
      const {gymName, badgeName, townName, badgeImage, name} = data[i];
      if (gyms[gymName]) {
        gyms[gymName].gymLeaders.push(name);
      } else {
        gyms[gymName] = {
          gymName,
          badgeName,
          townName,
          badgeImage,
          gymLeaders: [name],
        }
      }
    }

    this.setState({gyms: gyms});
  }

  _handleRemove(gym) {
    const {gyms} = this.state;

    fetch('/removeGym/' + gym.gymName, {
      method: 'post',
    }).then(res => console.log(res.json()));

    delete gyms[gym.gymName];
    this.setState({gyms});
  }

  render() {
    return (
      <div>
        {Object.values(this.state.gyms).map(g => {
          const {gymName, badgeName, townName, badgeImage, gymLeaders} = g;
          const gymLeadersString = gymLeaders.join(', ');
          return (
            <div key={gymName + gymLeadersString} className="gym-container">
              <div className="gym">
                {
                  badgeImage ?
                    <img
                      className="gym-img"
                      src={badgeImage}
                      alt={gymName || "gym image"} /> : null
                }
                <div className="gym-info">
                  <div>Gym Name: {gymName}</div>
                  <div>Location: {townName || "Unknown"}</div>
                  <div>Badge Name: {badgeName || "Unknown"}</div>
                  <div>Gym Leader(s): {gymLeadersString || "Unknown"}</div>
                </div>
              </div>
              <button onClick={() => this._handleRemove(g)}>Remove</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gyms
