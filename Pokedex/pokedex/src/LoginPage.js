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

        const loginReq = fetch('/LoginInfo/' + this.state.username + '/' + this.state.password)
            .then(res => res.json())
            .then(function (id) {
                return id[0].id;
            })
            .catch(function (err) {
                console.error(err);
                alert("Invalid login");
            });

        loginReq.then(id => this.setState({id: id}));
    }

    render() {
        if (this.state.id || this.state.id === 0) { // need to do this because 0 counts as falsy value
            return <HomePage userid={this.state.id}/>
        }

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
}

export default LoginPage