import { Map, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';

class GoogleMap extends Component {
    render() {
      const mapStyles = {
        width: "70%",
        height: "80%",
      };
        return (
            <Map
            google={this.props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: 47.444, lng: -122.176}}
            />
        );
    }
}
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyB5Aextt4PuSqpd0F0_fHMY95iTZYA5OkY'
  })(GoogleMap);