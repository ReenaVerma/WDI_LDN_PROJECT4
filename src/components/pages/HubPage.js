import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Timestamp from 'react-timestamp';
import '../../assets/scss/main.scss';

import GoogleMaps from '../../components/common/GoogleMaps';
// import GetLocation from '../../components/common/GetLocation';

// const rp = require('request-promise');

class Hub extends React.Component {

  state =  {
    places: null,
    articles: null,
    user: null,
    // latlng: null
    lat: null,
    lng: null
  }


  // setLocation = (latlng) => {
  //   this.setState({ latlng: latlng });
  //   console.log('from reenas hub', this.state.latlng);
  // }

  setLocation = (lat, lng) => {
    console.log('location set...', lat, lng);
    this.setState({ lat: lat, lng: lng }, this.getPlaces);
  }

  getPlaces = () => {
    const params = { count: 3, lat: 34.019864, lon: -118.490541 };
    if(this.state.lat && this.state.lng) {
      Object.assign(params, { lat: this.state.lat, lon: this.state.lng });
    }

    axios({
      url: 'https://developers.zomato.com/api/v2.1/geocode',
      params: params,
      json: true,
      method: 'GET',
      headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
    })
    // .then(response => res.json(response))
    // .catch(next);
      .then(res => {
        console.log(res.data);
        console.log(res.data.location.title);
        console.log(res.data.nearby_restaurants);
        this.setState({ places: res.data.nearby_restaurants});
      });

    axios({
      url: 'https://developers.zomato.com/api/v2.1/collections',
      params: params,
      json: true,
      method: 'GET',
      headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
    })
    // .then(response => res.json(response))
    // .catch(next);
      .then(res => {
        console.log(res.data);
        console.log(res.data.collections);
        this.setState({ articles: res.data.collections});
      });
  }


  componentDidMount() {
    this.getPlaces();
  }



  // componentDidMount() {
  //   const config = {
  //     headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
  //   };
  //
  //   // const lat = this.state.lat;
  //   // const lng = this.state.lng;
  //
  //   axios.get('https://developers.zomato.com/api/v2.1/collections?lat=51.5148&lon=0.0651&count=10', config)
  //   // axios.get('https://developers.zomato.com/api/v2.1/collections?lat=&lon=0.0651&count=12', config)
  //     .then(res => {
  //       console.log(res.data.collections);
  //       this.setState(
  //         { places: res.data.collections });
  //     });
  // }



  render() {
    console.log('hub state update', this.state.latlng);
    // console.log(this.state.data.places);
    // if places is null/false and nothing has loaded, dont run the code below.
    // if places is truthy, then run code below
    if (!this.state.places) return false;
    return (

      <main>
        <section className="hero hub is-bold section-top">
          <div className="hero-body no-padding">
            <div className="has-text-centered">
              <h1 className="is-size-1 has-text-white headertitle">Welcome to Los Angeles, USA Reena!</h1>
            </div>
          </div>
        </section>

        <section>
          <div className="has-text-centered">
            <h1 className="has-text-centered cat-titles">Useful Articles for your Neighbourhood:</h1>
          </div>
          <ul className="columns is-multiline">
            {this.state.articles.map((article, i) =>
              <li key={i} className="column is-one-third">
                <div className="container card">
                  <div className="">
                    <div className="card-image">
                      <figure className="image">
                        <Link to={article.collection.url}>
                          <img className="is-3by2" src={article.collection.image_url}/>
                          <p className="is-size-4 has-text-centered gold">{article.collection.title}</p>
                          <p className="is-size-6 has-text-centered">{article.collection.description}</p>
                        </Link>
                      </figure>
                    </div>
                  </div>
                </div>
              </li>)}
          </ul>
        </section>

        <section className="section">
          <div className="columns">
            <div className="column">
              <GoogleMaps setLocation={this.setLocation} />
            </div>
          </div>
        </section>




        <section className="grey">
          <div className="has-text-centered">
            <h1 className="has-text-centered cat-titles">Restaurants Nearby: </h1>
          </div>
          <ul className="columns is-multiline">
            {this.state.places.map((place, i) =>
              <li key={i} className="column is-one-quarter">
                <div className="container card">
                  <div className="">
                    <div className="card-image">
                      <img src={place.restaurant.featured_image}/>
                      <figure className="box">
                        <p className="is-size-4 has-text-left has-text-black">{place.restaurant.name}</p>
                        <p className="has-text-left">{place.restaurant.location.address}</p>
                        <p className="has-text-left">User rating: {place.restaurant.user_rating.rating_text}</p>
                        <p className="has-text-left">Votes: {place.restaurant.user_rating.votes}</p>
                        <br />
                        <div className="has-text-left">
                          <Link className="button is-outlined gold" to={place.restaurant.deeplink}>book a table now</Link>
                        </div>

                      </figure>
                    </div>
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
