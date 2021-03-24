"use strict";

// calling express library
const express = require("express");
// for env
require("dotenv").config();
const cors = require("cors");
// SuperAgent
const superagent = require("superagent");
// get weather data
const weather = require("./data/weather.json");
const weather_data = weather.data;

// initializing express library
const app = express();
app.use(cors());
const PORT = process.env.PORT;
// const PORT = 3001;
app.get("/", function (req, res) {
  res.send("Hello World");
});

function Forecast(date, description) {
  this.date = date;
  this.description = description;
}

function getLoc(req, res) {
  console.log(req.query);
  let lon = req.query.lon;
  let lat = req.query.lat;
  let forecastArr = weather_data.map(
    (x) => new Forecast(x.datetime, x.weather.description)
  );
  try {
    res.status(200).send({
      longitude: lon,
      latitude: lat,
      forecast: forecastArr,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

  
  function getForecast(req, res) {
    let lon = req.query.lon;
    let lat = req.query.lat;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily`;
    let queryWeather = {
      key: process.env.WEATHER_API_KEY,
      lat: lat,
      lon: lon,
      days: 10,
    };
    superagent
      .get(url)
      .query(queryWeather)
      .then((saResults) => {
        let saData = saResults.body.data
        let forecastArr = saData.map(
          (x) => new Forecast(x.datetime, x.weather.description)
        );
        res.status(200).send({
          longitude:lon,
          latitude:lat,
          forecast:forecastArr
        })
      });
  }

  // app.get("/weather",getLoc)
app.get("/weather", getForecast);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
