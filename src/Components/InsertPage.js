import React, {Component} from 'react';
import {List, Radio, Button, Avatar} from 'antd';


class InsertPage extends Component {
    constructor(){
        super();
        this.state = {
            interest: [],
            transportation: [],
        }

    }

    clickInterest = () => {
        console.log(this.state);
    }

    searchPlace = () => {
        this.props.submit(this.state);
    }
    render(){
        const cityInterest = this.props.cityInfo? this.props.cityInfo.interest: [];
        const cityTransp = this.props.cityInfo? this.props.cityInfo.transportation: [];
        return(   
            <div>
                <div className="insert-box">
                    <div>
                    <label>Interest: </label>
                    <List
                        className="sat-list"
                        itemLayout="horiztonal"
                        size="small"
                        dataSource={cityInterest}
                        renderItem={item => (
                            <List.Item
                                actions={[<Radio dataInfo={item} onClick={this.clickInterest}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} shape="square" />}
                                    title={<p>{item.satname}</p>}
                                    description={item}
                                />
    
                            </List.Item>
                        )}
                    />
                    </div>
                    <div>
                        <label>Transportation: </label>
                    <List
                        className="sat-list"
                        itemLayout="horiztonal"
                        size="small"
                        dataSource={cityTransp}
                        renderItem={item => (
                            <List.Item
                                actions={[<Radio dataInfo={item} onChange={this.clickInterest}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} shape="square" />}
                                    description={item}
                                />
    
                            </List.Item>
                        )}
                    />
                    <div>
                        <Button className="search-place-btn"
                        onClick = {this.searchPlace}>Search Places</Button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default InsertPage;