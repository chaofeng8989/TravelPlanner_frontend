import React, {Component} from 'react';
import Itinary from './Itinary';
import Main from './Main';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


class MainPage extends Component{
    render() {
    return (
        <Router>
            <div classname="menu-outer">
            <div classname="table">
                <ul className="topnav">
                <li><Link to="/MainPage">Main Page</Link></li>
                <li><Link to="/TripPara">Trip Details</Link></li>
                <li><Link to="/ItinaryHeader">Itinary</Link></li>
                <li><Link to="/History">Saved Trip</Link></li>
                </ul>
            </div>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/MainPage">
                <MainTitle />
                <Main />
                </Route>

                <Route path="/TripPara">
                <TripPara />
                </Route>

                <Route path="/ItinaryHeader">
                <ItinaryHeader />
                <Itinary />  
                </Route>

                <Route path="/History">
                <History />
                </Route>

            </Switch>
            </div>
        </Router>
        );
    }
}

function MainTitle() {
  return <h2>MainPage</h2>;
}

function TripPara() {
  return <h2>TripDetails</h2>;
}

function ItinaryHeader() {
  return <h2>Itinary</h2>;
}

function History() {
  return <h2>History</h2>;
}

export default MainPage;
