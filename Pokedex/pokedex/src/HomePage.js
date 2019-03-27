import React, {Component} from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import './css/homePage.css'

import About from "./About";
import Pokemon from "./Pokemon";
import Trainers from "./Trainers";
import Explore from "./Explore";
import Gyms from "./Gyms";
import Stats from "./Stats";

class HomePage extends Component {
    render() {
        const idProp = this.props.userId;
        return (
          <HashRouter>
            <div>
              <ul className="menu">
                <li><NavLink to="/">Personal Info</NavLink></li>
                <li><NavLink to="/pokemon">My Pokemon</NavLink></li>
                <li><NavLink to="/trainers">Trainers</NavLink></li>
                <li><NavLink to="/gyms">Gyms</NavLink></li>
                <li><NavLink to="/explore">Explore</NavLink></li>
                <li><NavLink to="/stats">Stats</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/" render={(props) => <About {...props} id={idProp} />}/>
                <Route exact path="/pokemon" render={(props) => <Pokemon {...props} id={idProp} />}/>
                <Route exact path="/trainers" render={(props) => <Trainers {...props} id={idProp} />}/>
                <Route exact path="/gyms" component={Gyms}/>
                <Route exact path="/explore" render={(props) => <Explore {...props} id={idProp} />}/>
                <Route exact path="/stats" render={(props) => <Stats {...props} id={idProp} />}/>
              </div>
            </div>
          </HashRouter>
        );
    }
}

export default HomePage
