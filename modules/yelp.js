"use strict";

let cache = require("./cache.js");
const superagent = require("superagent");
const parseYelp = require("./parseYelp");

function getFood(lat, lon) {
  const key = "yelp-" + lat + lon;
  let url = `https://api.yelp.com/v3/businesses/search`;
  const queryParams = {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    lat: lat,
    lon: lon,
    limit: 10,
  };
  // cache stays for 1 week
  if (cache[key] && Date.now() - cache[key].timestamp < 6.048e8) {
    console.log("Cache hit");
    // console.log("@ getFood", cache[key]);
  } else {
    console.log("Cache miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent
      .get(url)
      .query(queryParams)
      .then((response) => parseYelp(response.body));
    // console.log("@ getMovie cache miss", cache[key]);
  }

  return cache[key].data;
}

module.exports = getFood;
