import React, {Component} from 'react';
import { Collapse, Button } from 'antd';
import 'antd/dist/antd.css';
//import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Axios from 'axios';
import {BASE_URL} from '../constant';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; 
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
            texts:[],
            loading: false,
        };
    }

    // jump page function
    toOtherRoute = (url) => {
        const urlObj = {
            pathname: `${url}`,
            state: {

            }
        }
        this.props.history.push(urlObj)
    }

    testApi = () => {
        const {city, state} = this.props.location.key;
        console.log(city, state);
        const url = `${BASE_URL}city?city=seattle,wa,usa`;
        this.setState({
            loading: true,
        })
        Axios.get(url)
            .then(response => {
                this.setState({
                    tripsInfo: response.data,
                    loading: false,
                    selected: [],
                })
            })
            .catch(error => {
                console.log('err in fetching recomended tours ->', error);
                this.setState({
                    loading: false,
                        })
            })
    }

    onChangeList = (trips)=> {
        this.setState({
            texts: [trips.transportation[0],trips.transportation[1],trips.transportation[2]],
            panelStatus: true,
        })
    }

    render() {
        const textsList = this.state.texts;
        function generatePanel() {
            var panelList = []
            for (var i=1; i<=textsList.length; i++) {
              panelList.push(createPanel(i));
            }
            return panelList;
          }
      
        function createPanel(i) {
            return (
                <Panel 
                    header={textsList.length >= 1 ? trips.interest[1] : No_Rec}
                    extra={<Popup 
                                trigger={<button> Review</button>} 
                                position="bottom"
                                closeOnDocumentClick={true}
                                >
                                {No_Review}
                            </Popup>}
                    // disabled={this.state.panelStatus === false}
                    >
                    <div>{textsList[i-1]}</div>
                    <Button
                        type="default"
                        size="small"
                        onClick={this.toOtherRoute('/home/Itinary')}
                        >
                            Show Itinary
                    </Button>
                </Panel>
            )
          }

        const trips = this.state.tripsInfo ? this.state.tripsInfo : [];
        const { expandIconPosition } = this.state.expandIconPosition;
        return (
            <div>
                <Button
                    onClick={this.toOtherRoute('/home/CityDetails')}
                >
                    Desgin your own tour
                </Button>
                <div className="recommendation">
                    <Button className="testAPI"
                        size="small"
                        disabled={this.state.loading}
                        onClick={()=> this.testApi()}
                        >
                        testApi
                    </Button>
                    <Button className="mount"
                        size="small"
                        disabled={trips.length === 0}
                        onClick={()=> this.onChangeList(trips)}
                        >
                        mount list
                    </Button>
                    
                    <>
                    <Collapse
                        defaultActiveKey={[]}
                        // onChange={callback}
                        expandIconPosition={expandIconPosition}
                    >
                        {generatePanel()}
                    </Collapse>
                
                    </>
                </div>
            </div>
        );
    }
}

export default withRouter(Recommendation);