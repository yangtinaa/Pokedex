import React, {Component} from 'react';
import './App.css';
import LoginPage from "./LoginPage";
import Header from "./Header.js"

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <LoginPage/>
            </div>
        );
    }
}

export default App;
