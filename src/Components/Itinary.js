import React, {Component} from 'react';
import GoogleMap from './GoogleMap';
import {RecommendationList} from '../TestData.js';
import {InputNumber,Button} from 'antd';

export default class Itinary extends Component{
    constructor(){
        super();
        this.state = {
            activeDay: 1,
            Sites: [],
            Lats: [],
            Lons: [],
        };
    }

    onShowSites=(selectedTrip,idx) => {
        var dailyPlan=selectedTrip.length != 0 ? selectedTrip[idx-1].oneDayPlan:[];
        var siteNames=[];
        var siteLats=[];
        var siteLons=[];
        for (var i=0; i<dailyPlan.length;i++) {
          siteNames.push(dailyPlan[i].site);
          siteLats.push(dailyPlan[i].lat);
          siteLons.push(dailyPlan[i].lon);
        }
        this.setState({
          Sites: siteNames,
          Lats: siteLats,
          Lons: siteLons,
        })
        console.log(this.state.Sites)
        console.log(this.state.Lats)
      }

    onChangeActiveDay=(value)=> {
        console.log(value);
        this.setState({activeDay:value});
    }

    render() {
        const tripIdx = this.props.selectedTripIdx>=0?this.props.selectedTripIdx:null;
        const selectedTrip = tripIdx!=null ?RecommendationList.recommendations[tripIdx].plans : [];
        return (
            <div className="Itinary">
                <div className="ItemDisplayTable">
                    <div className="Date-selection">
                            <label>Select Day: </label>
                            <InputNumber
                                min={selectedTrip.length != 0 ? 1 : 0}
                                max={selectedTrip.length != 0 ? selectedTrip.length : 0}
                                defaultValue={1}
                                style={{margin: "0 2px"}}
                                onChange={this.onChangeActiveDay}
                            />

                            <Button
                                type="default"
                                size="small"
                                disabled={selectedTrip.length === 0}
                                onClick={()=>this.onShowSites(selectedTrip, this.state.activeDay)}
                                >
                                Show sites!
                            </Button>
                    </div>
                    Left Panel
                    
                </div>

                <div className="GoogleMap">
                    <p> selected trip plan: {selectedTrip.length != 0 ? RecommendationList.recommendations[tripIdx].title:"No trip selected"} </p>

                    <GoogleMap 
                        nameList={this.state.Sites}
                        lonList={this.state.Lons}
                        latList={this.state.Lats}
                    />
                </div>
            </div>
        )
    }
}