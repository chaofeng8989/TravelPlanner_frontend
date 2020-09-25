import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Button } from 'antd';

class Login extends Component {

    render() {
        return (
            <div className="loginPage">
                <div className="loginButton">
                    <Button  >
                        Login
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);