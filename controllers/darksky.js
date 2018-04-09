// import React from 'react';
// import axios from 'axios';

// darksky API

console.log(process.env.DARKSKY_API_KEY);

const rp = require('request-promise');

function forecast(req, res, next) {
  const endpoint = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/`;
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
