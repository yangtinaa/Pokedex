import React, {Component} from "react";

class About extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      // Temporarily hardcoded until we can pass ID from login page
      fetch('/user/0')
        .then(res => res.json())
        .then(data => this.setState(data[0]));
    }

    render() {
      if (this.state) {
        return (
          <div style={{display:"flex", flexDirection: "row"}}>
            {this.state.image ? <img style={{marginRight: "20px"}} src={this.state.image} /> : null}
            <div style={{display: "flex", flexDirection:"column"}}>
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
