import React, {Component} from 'react';
import GoogleMap from './GoogleMap';

export default class Itinary extends Component{
    render() {
        return (
            <div className="Itinary">
                <div className="ItemDisplayTable">
                    Left Panel
                </div>

                <div className="GoogleMap">
                    <GoogleMap />
                </div>
            </div>
        )
    }
}