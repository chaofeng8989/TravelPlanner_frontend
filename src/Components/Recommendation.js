import React, {Component} from 'react';
import { Collapse, Select, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; 
import CityReview from './CityReview';
import {allPlaces, trips} from '../TestData.js';
import { withRouter } from "react-router-dom"

const { Panel } = Collapse;
//const { Option } = Select;

var No_Rec = "No Recommendation available.";
var No_Review = "No Review Available.";

class Recommendation extends Component {
    constructor(){
        super();
        this.state = {
            expandIconPosition: 'left',
        };
    }

    // jump page function
    toOtherRoute = () => {
        const urlObj = {
            pathname: `/home/CityDetails`,
            state: {
                cityInfo: this.props.location.state.key,
            }
        }
        console.log(this.props.location.state.key);
        this.props.history.push(urlObj);
    }

    toItinary = (idx) => {
        const urlObj = {
            pathname: `/home/Itinary`,
            state: {
                selectedTripIdx: idx,
            }
        }
        this.props.history.push(urlObj);
    }

    onSelect = (value) => {
        console.log(value);
        this.toItinary(value);
    }

    generatePanel=(trips)=>{
        if (trips.length === 0) {
            return (
                    <Card size="small" title="No trip recommendation available, please refine search"  style={{ width: 300 }}>
                        <Link to="/TripPara">
                            <Button
                                type="default"
                                size="small"
                                // onClick={this.selectPlan}
                                >
                                Back to Trip Setting
                            </Button>
                        </Link>
                    </Card>
                )
        }
        var panelList = []
        for (var i=1; i<=trips.length; i++) {
          panelList.push(this.createPanel(trips,i));
        }
        return panelList;
      }
  
    createPanel=(trips,i)=>{
        var trip = trips[i-1].day;
        var numOfDay = trip.length+1;
        return (
            <Panel 
                header={`${numOfDay-1}-Day Trip`}
                extra={<Popup 
                            trigger={<button>Reviews</button>} 
                            position="bottom"
                            closeOnDocumentClick={true}
                            >
                            {trips.review?trips.review:No_Review}
                        </Popup>}
                // disabled={this.state.panelStatus === false}
                >
                <div>{this.generateTripSites(trips,i)}</div>
                    <Button
                        type="default"
                        size="small"
                        onClick={()=>this.onSelect(i-1)}
                        >
                        Show Itinary
                    </Button> 
            </Panel>
        )
      }
    
    generateTripSites = (trips,i)=>{
        var text = [];
        var eachTrip = trips[i-1].day;
        for (var j=0; j<eachTrip.length; j++) {
            var eachDay = eachTrip[j].simplePlaces;
            text.push(`Day ${j+1} : `);

            for (var k=0; k<eachDay.length; k++) {
                if (k===0) text.push(eachDay[k].name);
                else text.push(` -> ${eachDay[k].name}`);
            }
            text.push(<br/>);
        }
        return text;
    }


    render() {
        const { expandIconPosition } = this.state.expandIconPosition;       

        return (
            <div className="recommendation">
                <Button onClick = {this.toOtherRoute}>
                    Design your own tour
                </Button>
                {/* <div className="cityReview">
                    <CityReview 
                        reviews={RecommendationList}
                    />
                </div> */}

                <div className="recommendationList">
                    <>
                    <Collapse
                        defaultActiveKey={[]}
                        // onChange={callback}
                        expandIconPosition={expandIconPosition}
                    >
                        {this.generatePanel(trips)}
                    </Collapse>  
                </>
                </div>
            </div>
        );
    }
}

export default withRouter(Recommendation);