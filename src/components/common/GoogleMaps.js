/* global google */

import React from 'react';
// import GetLocation from '../../components/common/GetLocation';


class GoogleMap extends React.Component {

  state = {
    userLocation: '',
    location: {
      lat: 11.51,
      lng: 30.070
    }
  };

  componentDidMount() {
    this.getLocation();
    // console.log(this.mapDiv, google);
    console.log(this.state.location);
    this.map = new google.maps.Map(this.mapDiv, {
      center: this.state.location,
      zoom: 14
    });
    //update markers in
    this.infoWindow = new google.maps.InfoWindow;

  }

  // componentWillReceiveProps({ center, zoom }) {
  //   //like scope.$watch
  //   // console.log(props);
  //   this.map.setCenter(center);
  //   this.map.setZoom(zoom);
  //   // marker prop here
  // }


  getLocation = () => {

    navigator.geolocation.getCurrentPosition(pos => {

      const that = this;

      const userCurrentLat = pos.coords.latitude;
      const userCurrentLng = pos.coords.longitude;
      console.log(userCurrentLat, userCurrentLng );
      //I now need to convert the lat and long in to an origin
      const latlng = {lat: userCurrentLat, lng: userCurrentLng};
      console.log('Lat n lng', latlng);

      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            // successfully found
            that.userCurrentAddress = results[0].formatted_address;
            that.setState({userLocation: results[0].formatted_address});
            console.log('current address is: ' + that.userCurrentAddress);
            that.map.setCenter(latlng);
            const marker = new google.maps.Marker({
              position: latlng,
              title: 'Hello World!'
            });
            // To add the marker to the map, call setMap();
            marker.setMap(that.map);
          } else {
            // not found
            console.log('No results found');
          }
        } else {
          // google failure
          console.log('Geocoder failed due to: ' + status);
        }

      });
      //then I need to input the origin in the the google-maps directive
    }, err => {
      console.warn(err.code, err.message);
    });

  }


  render() {
    return (

      // ref is a callback function and passes in element into the DOM.
      // then we pass in this.mapDIV to appear in the DOM as the element.
      <section>
        <div className="google-map" ref={element => this.mapDiv = element}></div>
        <div className="location">You are here: {this.state.userLocation}</div>
      </section>
    );
  }

}

export default GoogleMap;
