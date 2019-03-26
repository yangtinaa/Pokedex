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

class HomePage extends Component {
    render() {
        return (
          <HashRouter>
            <div>
              <ul className="menu">
                <li><NavLink to="/about">Personal Info</NavLink></li>
                <li><NavLink to="/pokemon">My Pokemon</NavLink></li>
                <li><NavLink to="/trainers">Trainers</NavLink></li>
                <li><NavLink to="/explore">Explore</NavLink></li>
              </ul>
              <div className="content">
                <Route exact path="/about" component={About}/>
                <Route exact path="/pokemon" component={Pokemon}/>
                <Route exact path="/trainers" component={Trainers}/>
                <Route exact path="/explore" component={Explore}/>
              </div>
            </div>
          </HashRouter>
        );
    }
}

export default HomePage
