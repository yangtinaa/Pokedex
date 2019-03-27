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
    constructor(props) {
        super(props);
        this.state = {
          tab: "About"
        }
    }

    _isAdmin() {
      return this.props.userId === 11;
    }

    _handleChange(tab) {
      if (this.state.tab !== tab) {
        this.setState({tab});
      }
    }

    render() {
        const idProp = this.props.userId;
        const {tab} = this.state;
        return (
          <HashRouter>
            <div>
              <ul className="menu">
                <li className={(tab === "About") ? "selectedTab" : null} onClick={() => this._handleChange("About")}>
                  <NavLink to="/">Personal Info</NavLink>
                </li>
                <li className={(tab === "Pokemon") ? "selectedTab" : null} onClick={() => this._handleChange("Pokemon")}>
                  <NavLink to="/pokemon">My Pokemon</NavLink>
                </li>
                <li className={(tab === "Trainers") ? "selectedTab" : null} onClick={() => this._handleChange("Trainers")}>
                  <NavLink to="/trainers">Trainers</NavLink>
                </li>
                <li className={(tab === "Gyms") ? "selectedTab" : null} onClick={() => this._handleChange("Gyms")}>
                  <NavLink to="/gyms">Gyms</NavLink>
                </li>
                <li className={(tab === "Explore") ? "selectedTab" : null} onClick={() => this._handleChange("Explore")}>
                  <NavLink to="/explore">Explore</NavLink>
                </li>
                {!this._isAdmin() ? null :
                  <li className={(tab === "Stats") ? "selectedTab" : null} onClick={() => this._handleChange("Stats")}>
                    <NavLink to="/stats">Stats</NavLink>
                  </li>
                }
              </ul>
              <div className="content">
                <Route exact path="/" render={(props) => <About {...props} id={idProp} />}/>
                <Route exact path="/pokemon" render={(props) => <Pokemon {...props} id={idProp} />}/>
                <Route exact path="/trainers" render={(props) => <Trainers {...props} id={idProp} />}/>
                <Route exact path="/gyms" component={Gyms}/>
                <Route exact path="/explore" render={(props) => <Explore {...props} id={idProp} />}/>
                {this._isAdmin() ? <Route exact path="/stats" render={(props) => <Stats {...props} id={idProp} />}/> : null}
              </div>
            </div>
          </HashRouter>
        );
    }
}

export default HomePage
