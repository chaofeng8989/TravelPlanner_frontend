import React, {Component} from 'react';
import {Checkbox, Button, Avatar} from 'antd';


class InsertPage extends Component {
    constructor(){
        super();
        this.state = {
            interest: "",
        }

    }

    onChangeInterest = checkedValue => {
        this.setState({
          interest: checkedValue,
        });
        console.log(checkedValue);
    };

    searchPlace = () => {
        this.props.submit(this.state);
    }
    render(){
        const cityInterest = this.props.cityInfo? this.props.cityInfo.interest: [];
 
        return(   
            <div> 
                <div className="insert-box">
                <label>Interest: </label>
                <Checkbox.Group options = {cityInterest}
                    onChange = {this.onChangeInterest}></Checkbox.Group>
                </div>
                <Button className="search-place-btn"
                onClick = {this.searchPlace}>Search Places</Button>
            </div>
        );
    }

}
export default InsertPage;