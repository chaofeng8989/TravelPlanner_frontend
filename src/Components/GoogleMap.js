import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, {Component} from 'react';

class GoogleMap extends Component {
  constructor(){
    super();
    this.state = {
      showingInfoWindow: false,  // Hides or shows the InfoWindow
      activeMarker: {},          // Shows the active marker upon click
      selectedPlace: {name: "locationA"}          // Shows the InfoWindow to the selected place upon a marker
    };
}

onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
            >
              <Marker
                onClick={this.onMarkerClick}
                position={{lat: 50.444, lng: -122.176}}
                name={'Kenyatta International Convention Centre'}
              />
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>
            </Map>
        );
    }
}
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyB5Aextt4PuSqpd0F0_fHMY95iTZYA5OkY'
  })(GoogleMap);