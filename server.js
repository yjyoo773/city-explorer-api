"use strict";

// calling express library
const express = require("express");
// for env
require("dotenv").config();
const cors = require("cors");
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

// weather_data.map((x) => Forecast(x.datetime, x.weather.description));

app.get("/weather", (req, res) => {
  console.log(req.query)
  res.send({
    longitude: req.query.lon,
    latitude: req.query.lat,
    // forecast: Forecast(weather_data.datetime, weather_data.weather),
    forecast: weather_data.map((x) =>
      new Forecast(x.datetime, x.weather.description)
    ),
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
