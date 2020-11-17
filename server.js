//Setup empty JS object to act as endpoint for all routes
projectData = {};

//Require Express
const express = require("express");

// Express instance
const app = express();

/*Middleware*/

const bodyParser = require("body-parser");
//Here we are configuring express to use body-parse as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

// listening function

const listening = () => {
  console.log("Server runing");
  console.log(`Running on localhost ${port}`);
};
const server = app.listen(port, listening);

// Routes

const getData = (req, res) => {
  res.send(projectData);
};

app.get("/getData", getData);

const sendData = (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    message: req.body.feelings,
  };
  res.send(projectData);
};

app.post("/sendData", sendData);
