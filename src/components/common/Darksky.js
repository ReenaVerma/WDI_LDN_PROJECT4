import React from 'react';
// import axios from 'axios';
import '../../assets/scss/main.scss';

// const Navbar = () => {

class DarkSky extends React.Component {


    state = {
      temperature: []
    }

    // darksky API
    componentDidMount() {
      // navigator.geolocation.getCurrentPosition(pos => {
      //
      //   console.log(pos);
      //   axios.get('/api/forecast', {
      //     params: { lat: pos.coords.latitude, lng: pos.coords.longitude }
      //   })
      //     // .then(res => this.temperature = res.data.currently.temperature);
      //     .then(res => this.setState({ temperature: res.data.currently.temperature}, () => console.log(res.data.currently.temperature)));
      // });
    }



    render() {
      return (
        <section>
          <div className="notification is-info animated slideInRight">The temperature is 22ºC</div>
        </section>
      );
    }
}

export default DarkSky;
