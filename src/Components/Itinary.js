import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
<<<<<<< HEAD
import { withRouter } from "react-router-dom";

class Itinary extends Component{
=======
import { Button } from 'antd';
import { withRouter } from "react-router-dom"



class Itinary extends Component{

    // get the MainPage data
    test = () => {
        console.log(this.props.location.state.key)
    }

>>>>>>> e66d92b0fcc5a2e57d4fb22f9b2320763be77169
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