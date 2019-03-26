import React, {Component} from "react";
import './css/about.css'

class About extends Component {
    componentDidMount() {
      // Temporarily hardcoded until we can pass ID from login page
      fetch('/user/0')
        .then(res => res.json())
        .then(data => this.setState(data[0]));
    }

    render() {
      if (this.state) {
        return (
          <div className="about">
            {
              this.state.image ?
                <img
                  className="about-img"
                  src={this.state.image}
                  alt={this.state.name || "user image"} /> : null
            }
            <div className="about-info">
              <div>Name: {this.state.name}</div>
              <div>Age: {this.state.age || "Unknown"}</div>
              <div>Gender: {this.state.gender || "Unknown"}</div>
              <div>Hometown: {this.state.hometown || "Unknown"}</div>
            </div>
          </div>
        );
      }

      return null;
    }
}

export default About
