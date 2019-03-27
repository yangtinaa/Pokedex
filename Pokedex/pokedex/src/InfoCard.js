import React, {Component} from "react";
import './css/about.css'

class InfoCard extends Component {
  render() {
    const {image, name, age, gender, hometown, style, gymName} = this.props;

    return (
      <div className="about" style={style}>
        {
          image ?
            <img
              className="about-img"
              src={image}
              alt={name || "element image"} /> : null
        }
        <div className="about-info">
          <div>Name: {name}</div>
          <div>Age: {age || "Unknown"}</div>
          <div>Gender: {gender || "Unknown"}</div>
          <div>Hometown: {hometown || "Unknown"}</div>
          {this.props.gymName ? <div>Leader Of: {gymName}</div> : null}
        </div>
      </div>
    );
  }
}

export default InfoCard
