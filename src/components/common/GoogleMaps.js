/* global google */

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import '../../assets/scss/main.scss';
// import GetLocation from '../../components/common/GetLocation';


class GoogleMap extends React.Component {

  state = {
    users: [],
    userLocation: '',
    location: {
      lat: 51.515642,
      lng: -0.072407
    }
  };

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

  getUsers() {
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }, () =>  {
        console.log('USERS', this.state.users);

        console.log('USERS length', this.state.users.length);

        this.state.users.map(user => {
          console.log('USER LOCATION', user.userLocation);
          if (user.userLocation) {


            const image = {
              url: user.image, // url
              scaledSize: new google.maps.Size(60, 60), // scaled size
              origin: new google.maps.Point(0,0) // origin
              // anchor: new google.maps.Point(0, 0) // anchor
            };

            // return new google.maps.Marker({
            const marker = new google.maps.Marker({
              // map: this.map,
              position: user.userLocation,
              zoom: 15,
              icon: image
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
              <a href="${user._id}">Message ${user.username}</a>
              `;

            const infoWindow = new google.maps.InfoWindow({
              content: infoContent,
              maxWidth: 200,
              maxHeight: 100
            });

            google.maps.event.addListener(marker, 'click', function () {
              infoWindow.open(this.map, marker);
            });
          }

        });
      }));
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


      //passing props info here, into page where this function is written (Hub Page)
      // this.props.setLocation(latlng);

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      //passing props info here, into page where this function is written (Hub Page)
      // this.props.setLocation(latlng);
      this.props.setLocation(lat, lng);




      const userCurrentLat = pos.coords.latitude;
      const userCurrentLng = pos.coords.longitude;


      //I now need to convert the lat and long in to an origin
      const latlng = {lat: userCurrentLat, lng: userCurrentLng};
      console.log('Lat n lng', latlng);

      //passing props info here, into page where this function is written (Hub Page)
      // this.props.setLocation(latlng);



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



            // update user with latest location
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
      //then I need to input the origin in the the google-maps directive
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
          <div className="columns has-text-centered">
            <div className="column">
              <div className="location">
                <i className="fas fa-location-arrow fa-3x gold"></i>
                <h2 className="here-title">Finding your location...</h2>
                <p>{this.state.userLocation}</p>
              </div>
            </div>
            <div className="column">
              <div className="location">
                <i className="fas fa-users fa-3x gold"></i>
                <h2 className="here-title">There are {this.state.users.length} users in your area!</h2>
                <p>Use the map below to message your users!</p>
              </div>
            </div>
            <div className="column">
              <div className="location">
                <i className="far fa-comments fa-3x gold"></i>
                <h2 className="here-title">Search more users</h2>
                <Link to="/users"><p>Filter and browse</p></Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="columns has-text-centered">
            <div className="column">
              <div className="google-map" ref={element => this.mapDiv = element}></div>
            </div>
          </div>
        </section>
      </div>

    );
  }

}

export default GoogleMap;
