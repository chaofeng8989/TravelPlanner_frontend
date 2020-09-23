import React, {Component} from 'react';
import SelectInfo from './SelectInfo';
import SearchInfo from './SearchInfo';
import {Button} from 'antd'
import {Link} from "react-router-dom"

class MainPage extends Component{
    constructor() {
        super();
        this.state = {
            cityName: "seattle,wa,usa",
            placeInfo: undefined,
        }
    }

    //call nav里的func去传数据，同时将数据传给citydetail
    getCityName = () => {
        this.props.searchCity(this.state.cityName);
    }

    sendInfo = (placeInfo) => {
        this.setState({
            placeInfo: placeInfo,
        })
        const { chosen } = placeInfo;
        console.log(chosen)
    }
    
    render() {
        return (
            <div className='PlaceInfo'>
                <div>
                    <SearchInfo startSearch={this.sendInfo} />
                    <SelectInfo />
                </div>
                <Link to="/TripPara">
                    <Button onClick = {this.getCityName}>
                    Seattle
                    </Button>
                </Link>
            </div>
        );
    }
}

export default MainPage;