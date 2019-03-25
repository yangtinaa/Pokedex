import React, {Component} from 'react';

import Header from './Header.js'
import './css/loginPage.css'

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <form>
                    <div className='login-form'>
                        <label>
                            Username:
                            <input type="text" name="username"/>
                        </label>
                        <label>
                            Password:
                            <input type="password" name="password"/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage