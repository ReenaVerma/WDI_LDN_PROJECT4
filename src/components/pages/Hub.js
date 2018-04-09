import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/scss/style.scss';

import GoogleMaps from '../../components/common/GoogleMaps';
// import GetLocation from '../../components/common/GetLocation';

class Hub extends React.Component {

  state =  {
    places: null
    // country: {
    //   latlng: [51.51, -0.08]
    // }

  }


  componentDidMount() {
    const config = {
      headers: {'user-key': '54cfeea773535a894eba2d22e77cd0d8'}
    };

    axios.get('https://developers.zomato.com/api/v2.1/collections?lat=51.5148&lon=0.0651&count=10', config)
      .then(res => {
        console.log(res.data.collections);
        this.setState(
          { places: res.data.collections });
      });
  }


  render() {

    // console.log(this.state.data.places);
    // if places is null/false and nothing has loaded, dont run the code below.
    // if places is truthy, then run code below
    if (!this.state.places) return false;
    return (
      <main>

        <section>
          <h1 className="title">Hub Page with map and travel apis (post login) </h1>
          {/* <GoogleMaps center={{lat: this.state.country.latlng[0], lng: this.state.country.latlng[1] }} zoom={8}/> */}
          <GoogleMaps />
        </section>

        <section>
          {/* <GetLocation /> */}
        </section>

        <section>

          <div className="container">
            <h1 className="title has-text-centered has-text-primary">Restaurants Nearby:</h1>
            <div className="has-text-centered">

            </div>
            <ul className="columns is-multiline">
              {this.state.places.map((place, i) =>
                <li key={i} className="column is-one-third">
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
          </div>
        </section>


      </main>


    );
  }
}

export default Hub;
