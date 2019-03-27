import React, {Component} from 'react';

import HomePage from './HomePage.js'
import './css/loginPage.css'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            username: "",
            password: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/LoginInfo/' + this.state.username + '/' + this.state.password)
            .then(res => res.json())
            .then(id => this.setState({id: id[0].id}))
            .catch(function (err) {
                console.error(err);
                alert("Invalid login");
            });
    }

    render() {
        if (this.state.id || this.state.id === 0) { // need to do this because 0 counts as falsy value
            return <HomePage userId={this.state.id}/>
        }

        return (
            <div style={{marginTop: "20px"}}>
                <form onSubmit={this.handleSubmit}>
                    <div className='login-form'>
                        <label>
                            Username:
                            <input type="text"
                                   id="username"
                                   style={{marginLeft: "5px"}}
                                   onChange={this.handleChange}
                            />
                        </label>
                        <label style={{marginTop: "5px"}}>
                            Password:
                            <input type="password"
                                   id="password"
                                   style={{marginLeft: "5px"}}
                                   onChange={this.handleChange}
                            />
                        </label>

                        <input style={{marginTop: "20px"}} type="submit" value="Log In"/>
                    </div>
                </form>

            </div>
        )
    }
}

export default LoginPage
