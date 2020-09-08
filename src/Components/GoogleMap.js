import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';
class GoogleMap extends Component {
    render() {
        return (
            <Map
            google={this.props.google}
            zoom={8}
            initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
    }
}
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyB5Aextt4PuSqpd0F0_fHMY95iTZYA5OkY'
  })(GoogleMap);