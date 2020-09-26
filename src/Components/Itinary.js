import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
import { withRouter } from "react-router-dom";
import { Button } from 'antd';

class Itinary extends Component{

    // get the MainPage data
    test = () => {
        console.log(this.props.location.state.key)
    }

    render() {
        
        return (
            <div className="Itinary">
                <div className="ItemDisplayTable">
                    <Button onClick={this.test}>
                        Left Panel
                    </Button>
                </div>

                <div className="GoogleMap">
                    <GoogleMap />
                </div>
            </div>
        );
    }
}

export default withRouter(Itinary);