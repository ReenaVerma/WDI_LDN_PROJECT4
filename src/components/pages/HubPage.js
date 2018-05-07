import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Promise from 'bluebird';
// import Timestamp from 'react-timestamp';
import '../../assets/scss/main.scss';

import GoogleMaps from '../../components/common/GoogleMaps';
import Footer from '../../components/common/Footer';
// import Darksky from '../../components/common/Darksky';


// const rp = require('request-promise');

class Hub extends React.Component {

  state =  {
    places: null,
    articles: null,
    user: null,
    // latlng: null
    lat: null,
    lng: null,
    businesses: []
  }


  // setLocation = (latlng) => {
  //   this.setState({ latlng: latlng });
  //   console.log('from reenas hub', this.state.latlng);
  // }



  setLocation = (lat, lng) => {
    console.log('location set...', lat, lng);
    this.setState({ lat: lat, lng: lng }, this.getPlaces);
  }


  getYelp = () => {
    // const params = {lat: this.state.lat, lng: this.state.lng};
    const params = {latitude: 34.019864, longitude: -118.490541 };
    const urlProxy = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
    Promise.props({
      businesses: axios({
        url: urlProxy,
        params: params,
        json: true,
        method: 'GET',
        // withCredentials: true,
        headers: {
          'Authorization': 'Bearer iRl7stJSAQhyiF9CxM2MRT_4O0hNx7MJrQTfWjEG-Yw3PjVKZPzYGFEbl5VR-mrEKZ26WKvM9CnuGn150ogSlyHgLk6XrGSceYuGKUyjhamuOQQ7c58ueyMgWEPLWnYx',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // 'Origin': 'http://localhost:8000',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': 'http://localhost:8000'
        }
      })
        .then(res => this.setState({ businesses: res.data}))
        .then(res => console.log('YELP', res.data))


        // .then(res => JSON.stringify(res.data.businseses))
        .catch(err => console.log(err))
    });
  }

  //   <ul className="columns is-multiline">
  //     {Object.keys(this.state.businesses).map((item, i) => (
  //       <li key={i} className="column is-one-third">
  //         <div className="container card">
  //           <div className="">
  //             <div className="card-image">
  //               <figure className="box">
  //
  //
  //                 <p className="is-size-4 has-text-left has-text-black">Key:{i} Name:{this.state.businesses[item]}</p>
  //                 {/* <p className="has-text-left">{[item].name}</p> */}
  //
  //               </figure>
  //             </div>
  //           </div>
  //         </div>
  //       </li>))}
  //   </ul>
  // </section>

  //
  // getPlaces = () => {
  //   const params = {count: 3, lat: 34.019864, lon: -118.490541 };
  //   if(this.state.lat && this.state.lng) {
  //     Object.assign(params, { lat: this.state.lat, lon: this.state.lng });
  //   }
  //
  //   //restaurants
  //   Promise.props({
  //     restaurants: axios({
  //       url: 'https://developers.zomato.com/api/v2.1/geocode',
  //       params: params,
  //       json: true,
  //       method: 'GET',
  //       headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
  //     }).then(res => res.data),
  //
  //     articles: axios({
  //       url: 'https://developers.zomato.com/api/v2.1/collections',
  //       params: params,
  //       json: true,
  //       method: 'GET',
  //       headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
  //     }).then(res => res.data)
  //
  //   })
  //     .then(data => {
  //       this.setState({
  //         places: data.restaurants.nearby_restaurants.slice(0, 6),
  //         articles: data.articles.collections
  //       });
  //     });
  // }



  // componentWillMount() {
  //   // this.getPlaces();
  //   this.getYelp();
  // }

  componentDidMount() {
    this.getYelp();
  }


  render() {
    // console.log('hub state update', this.state.latlng);
    // console.log('PLACES', this.state.places);
    console.log('BUSINESS in JSX', this.state.businesses);
    // console.log(this.state.data.places);
    // if places is null/false and nothing has loaded, dont run the code below.
    // if places is truthy, then run code below
    if (!this.state.businesses) return false;
    return (

      <main>
        <section className="hero hub-image section-top">
          <div className="hero-body no-padding">
            <div className="has-text-centered">
              <h1 className="hub-title">Your Travel Hub</h1>
            </div>
          </div>
        </section>
        {/* <Darksky /> */}

        <section className="section">
          <div className="columns">
            <div className="column">
              <GoogleMaps setLocation={this.setLocation} />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="has-text-centered">
            <h1 className="has-text-centered cat-titles">YELP:</h1>
          </div>
          <ul className="columns is-multiline">

            {this.state.businesses.map((business, i) =>
              <li key={i} className="column is-one-third">
                <div className="container card">
                  <div className="">
                    <div className="card-image">
                      <figure className="box">


                        <p className="is-size-4 has-text-left has-text-black">{business.businesses[0].name}</p>
                        {/* <p className="has-text-left">{business.name}</p> */}

                      </figure>
                    </div>
                  </div>
                </div>

              </li>)}
          </ul>
        </section>


        {/* <section className=" grey section">
          <div className="has-text-centered">
            <h1 className="has-text-centered cat-titles">Tours to Book in your Area: </h1>
          </div>
          <ul className="columns is-multiline">
            {this.state.places.map((place, i) =>
              <li key={i} className="column is-2">
                <div className="container card">
                  <div className="">
                    <div className="card-image">
                      <img src={place.restaurant.featured_image}/>
                      <figure className="box">
                        <p className="is-size-4 has-text-left has-text-black">{place.restaurant.name}</p>
                        <p className="has-text-left"><strong>Tour price: {place.restaurant.currency}{place.restaurant.average_cost_for_two}</strong></p>
                        <p className="has-text-left has-text-primary is-bold">User rating: {place.restaurant.user_rating.rating_text}</p>
                        <p className="has-text-left has-text-primary">Votes:{place.restaurant.user_rating.votes}</p>
                        <Link className="gold has-text-left pink" to={place.restaurant.events_url} target="_blank">book your tour</Link>
                      </figure>
                    </div>
                  </div>
                </div>
              </li>)}
          </ul>
        </section> */}


        {/* <section className="section">
          <div className="has-text-centered">
            <h1 className="has-text-centered cat-titles">Trending in your Neighbourhood:</h1>
          </div>
          <ul className="columns is-multiline">
            {this.state.articles.map((article, i) =>
              <li key={i} className="column is-one-third">
                <div className="container card">
                  <div className="">
                    <div className="card-image">
                      <figure className="box">
                        <Link to={article.collection.url}>
                          <img className="is-3by2" src={article.collection.image_url}/>
                          <p className="is-size-4 has-text-left has-text-black">{article.collection.title}</p>
                          <p className="has-text-left">{article.collection.description}</p>
                        </Link>
                      </figure>
                    </div>
                  </div>
                </div>
              </li>)}
          </ul>
        </section> */}



        <Footer />
      </main>



    );
  }
}

export default Hub;
