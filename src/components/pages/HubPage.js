import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/scss/main.scss';

import GoogleMaps from '../../components/common/GoogleMaps';
// import GetLocation from '../../components/common/GetLocation';

class Hub extends React.Component {

  state =  {
    places: null,
    user: null,
    latlng: null
  }


  setLocation = (latlng) => {
    this.setState({ latlng: latlng });
    console.log('from reenas hub', this.state.latlng);
  }



  componentDidMount() {
    const config = {
      headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
    };
    // axios.get('https://developers.zomato.com/api/v2.1/collections?lat=51.5148&lon=0.0651&count=10', config)
    axios.get('https://developers.zomato.com/api/v2.1/collections?lat=51.5148&lon=0.0651&count=12', config)
      .then(res => {
        console.log(res.data.collections);
        this.setState(
          { places: res.data.collections });
      });
  }



  render() {
    console.log('hub state update', this.state.latlng);
    // console.log(this.state.data.places);
    // if places is null/false and nothing has loaded, dont run the code below.
    // if places is truthy, then run code below
    if (!this.state.places) return false;
    return (

      <main>
        <section className="hero is-medium hub is-bold">
          <div className="hero-body no-padding">
            <div className="has-text-centered">
              <h1 className="title">Welcome to London Reena!</h1>
              <h1 className="title">You are here:</h1>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns">
            <div className="column">
              <GoogleMaps setLocation={this.setLocation} />
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <h1 className="title has-text-centered has-text-primary">Restaurants Nearby:</h1>
          </div>
        </section>
        <section>
          <div className="has-text-centered">
          </div>
          <ul className="columns is-multiline">
            {this.state.places.map((place, i) =>
              <li key={i} className="column is-one-quarter">
                <div className="card-content">
                  <div className="card-image">
                    <figure className="image">
                      <h2 className="subtitle is-3 has-text-centered">{place.collection.title}</h2>
                      <p className="has-text-centered">{place.collection.description}</p>
                      <img src={place.collection.image_url}/>
                      <div className="has-text-centered">
                        <Link className="button is-primary" to={place.collection.url}>view more!</Link>
                      </div>

                    </figure>
                  </div>
                </div>
              </li>)}
          </ul>
        </section>
      </main>



    );
  }
}

export default Hub;
