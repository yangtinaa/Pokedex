import React, {Component} from 'react';

import HomePage from './HomePage.js'
import './css/loginPage.css'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // validateForm() {
    //     return this.state.username > 0 && this.state.password > 0;
    // }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // hardcoding login for now, can add real login later
        // https://serverless-stack.com/chapters/login-with-aws-cognito.html
        if (this.state.username === "trainer" && this.state.password === "1234") {
            return this._renderHomePage();
        } else {
            alert("Invalid login")
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='login-form'>
                        <label>
                            Username:
                            <input type="text"
                                   id="username"
                                   onChange={this.handleChange}
                            />
                        </label>
                        <label>
                            Password:
                            <input type="password"
                                   id="password"
                                   onChange={this.handleChange}
                            />
                        </label>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }

    _renderHomePage() {
        // TODO route to home page
    }
}

export default LoginPage