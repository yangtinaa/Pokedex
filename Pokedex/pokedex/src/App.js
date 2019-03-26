import React, {Component} from 'react';
import './App.css';
import HomePage from "./HomePage";
import Header from "./Header.js"

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <HomePage/>
            </div>
        );
    }
}

export default App;
