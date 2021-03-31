"use strict";

const Yelp = require("./yelpConstructor");

function parseYelp(yelpData) {
  try {
    const yelpSummaries = yelpData.businesses.map((item) => {
      return new Yelp(item);
    });
    console.log("@ parseYelp: ", yelpSummaries);
    return Promise.resolve(yelpSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}
module.exports = parseYelp;
