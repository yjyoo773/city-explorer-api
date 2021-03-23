"use strict";

// calling express library
const express = require("express");
// for env
require("dotenv").config();
const cors = require("cors");

// initializing express library
const app = express();
app.use(cors());
const PORT = process.env.PORT;
// const PORT = 3001;
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

