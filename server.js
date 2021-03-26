// ========================== MY CODE ================================================
// "use strict";

// // calling express library
// const express = require("express");
// // for env
// require("dotenv").config();
// const cors = require("cors");

// // Import Modules
// const getForecast = require("./modules/getForcast");
// const getMovies = require("./modules/getMovies");

// // initializing express library
// const app = express();
// app.use(cors());
// const PORT = process.env.PORT;

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });
// app.get("/weather", getForecast);
// app.get("/movies", getMovies);
// app.get("*", function (req, res) {
//   res.status(404).send("Error: Page not found 404");
// });
// app.listen(PORT, () => console.log(`listening on ${PORT}`));

// ========================== Lab 10 Code ================================================

"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const weatherHandler = require("./modules/weatherHandler.js");
const movieHandler = require("./modules/movieHandler");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

// // ==========================  My Code Remove Later!!! ====================================

app.get("/", function (req, res) {
  res.send("Hello World");
});
// // ========================================================================================

app.get("/movies", movieHandler);
app.get("/weather", weatherHandler);

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
