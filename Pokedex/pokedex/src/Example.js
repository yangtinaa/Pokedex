import React, {Component} from 'react';

import Header from './Header.js'

// Example for retrieving server data and using it
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          towns: []
        };
    }

    componentDidMount() {
      fetch('/towns')
        .then(res => res.json())
        .then(towns => this.setState({ towns: towns }));
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="towns">
                  <h1>Towns</h1>
                  {this.state.towns.map(town =>
                    <div key={town.name}>{town.name}</div>
                  )}
                </div>
            </div>
        )
    }
}

export default User
