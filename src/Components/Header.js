import React, {Component} from 'react';
import Navigation from './Navigation';
import Login from './Login';

export default class MainPage extends Component{
    render() {
        return (
            <div className="navheader">
                <div className="leftheader">
                    <Navigation />
                </div>

                <div className="rightheader">
                    <Login />
                </div>
            </div>
        )
    }
}