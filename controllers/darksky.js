// import React from 'react';
// import axios from 'axios';

// darksky API



const rp = require('request-promise');

function forecast(req, res, next) {
  const endpoint = 'https://api.darksky.net/forecast/75f4aa767c9a552f37a6a6fc099f84f6';
  const { lat, lng } = req.query;
  console.log(req.query);

  rp({
    url: `${endpoint}${lat},${lng}`,
    qs: { units: 'si'},
    json: true,
    method: 'GET'
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  forecast
};
