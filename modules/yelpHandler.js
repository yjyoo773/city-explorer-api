"use strict";

const yelp = require("./yelp");

function yelpHandler(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  yelp(lat, lon)
    .then((summaries) => {
      console.log("from yelpHandler", summaries);
      res.status(200).send(summaries);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry. Something went wrong!");
    });
}

module.exports = yelpHandler;
