/* global google */

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class GoogleMap extends React.Component {

  state = {
    users: [],
    userLocation: '',
    location: {
      lat: 51.515642,
      lng: -0.072407
    }
  };

  // SETTING GOOGLE MAPS DIV
  componentDidMount() {
    this.getLocation();

    // console.log(this.mapDiv, google);
    console.log(this.state.location);
    this.map = new google.maps.Map(this.mapDiv, {
      center: this.state.location,
      zoom: 17,
      styles:
      [
        {
          'featureType': 'landscape',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'stylers': [
            {
              'hue': '#00aaff'
            },
            {
              'saturation': -100
            },
            {
              'gamma': 2.15
            },
            {
              'lightness': 12
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'lightness': 24
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'lightness': 57
            }
          ]
        }
      ]
    });

    //update markers in
    this.infoWindow = new google.maps.InfoWindow;
    this.getUsers();
  }


  // GET USERS FROM API/ROUTE
  getUsers() {
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }, () =>  {
        console.log('USERS', this.state.users);
        // console.log('USERS length', this.state.users.length);

        // MAP THROUGH USERS
        this.state.users.map(user => {
          console.log('USER LOCATION', user.userLocation);
          if (user.userLocation) {

            // SET PIN IMAGE
            const image = {
              url: user.image,
              scaledSize: new google.maps.Size(110, 80),
              origin: new google.maps.Point(10,10)
            };

            // SET MARKER POSITION
            const marker = new google.maps.Marker({
              // map: this.map,
              position: user.userLocation,
              zoom: 15,
              icon: image,
              animation: google.maps.Animation.BOUNCE
            });
            marker.setMap(this.map);


            //HERE WE ARE DEFINING INFO WINDOWS
            const photo = user.image;
            const infoContent = `
              <br/>
              <strong>User: ${user.username}</strong><br/>
              Lost logged in: ${user.last_login_date}<br/>
              Travelling: ${user.travelling}<br/>
              <img id="abi" src="${photo}"><br/>
              <a href="/users/${user._id}">Message ${user.username}</a>
              `;

            const infoWindow = new google.maps.InfoWindow({
              content: infoContent,
              maxWidth: 200,
              maxHeight: 50
            });

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open(this.map, marker);
            });
          }
        });
      }));
  }

  // GEOLOCATION FUNCTION
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
 
      const that = this;
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      //passing props info here, into page where this function is written (Hub Page)
      this.props.setLocation(lat, lng);

      const userCurrentLat = pos.coords.latitude;
      const userCurrentLng = pos.coords.longitude;

      //I now need to convert the lat and long in to an origin
      const latlng = {lat: userCurrentLat, lng: userCurrentLng};
      console.log('Lat n lng', latlng);

      // IF LOCATION FOUND, SET A FORMATTED ADDRESS
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            // successfully found
            that.userCurrentAddress = results[0].formatted_address;
            that.setState({userLocation: results[0].formatted_address});
            console.log('current address is: ' + that.userCurrentAddress);
            document.getElementById('finding').innerHTML = that.state.userLocation;

            // DROP LOCATION ON THE MAP
            that.map.setCenter(latlng);
            const marker = new google.maps.Marker({
              position: latlng,
              title: 'YOUR LOCATION!',
              animation: google.maps.Animation.DROP
            });
            // To add the marker to the map, call setMap();
            marker.setMap(that.map);


            // UPDATE USER WITH WITH LATEST LOCATION
            const userId = Auth.getPayload().sub;
            axios.get(`/api/users/${userId}`)
              .then(user => {
                console.log('pre-save user', user);
                user.userLocation = latlng;
                return axios.put(`/api/users/${userId}`, user);
              })
              .then(res => console.log('new saved user', res.data))
              .catch(err => console.error(err));

          } else {
            // not found
            console.log('No results found');
          }
        } else {
          // google failure
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }, err => {
      console.warn(err.code, err.message);
    });
  }


  render() {
    return (

      // ref is a callback function and passes in element into the DOM.
      // then we pass in this.mapDIV to appear in the DOM as the element.
      <div>
        <section className="">
          <h1 className="has-text-centered cat-titles">Cool Dudes Nearby to Chill With... </h1>
          <div className="columns has-text-centered">
            <div className="column">
              <div className="location">
                <i className="fas fa-map-marker fa-3x gold"></i>
                <h2 className="sub-title">Your current travel location...</h2>
                <p id="finding">finding your location...</p>
              </div>
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <div className="location">
                <i className="fas fa-users fa-3x gold"></i>
                <h2 className="sub-title">There are {this.state.users.length} users using this app</h2>
                <p>Use the map below to message your users!</p>
              </div>
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <div className="google-map" ref={element => this.mapDiv = element}></div>
            </div>
          </div>
          <div className="columns has-text-centered">
            <div className="column">
              <div className="location">
                <p className="buttons is-centered">
                  <Link to="/users" className="button is-large is-primary">search for more users nearby &nbsp;&nbsp;
                  <span className="icon is-medium">
                    <i className="far fa-arrow-alt-circle-right has-text-white"></i>
                  </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default GoogleMap;
