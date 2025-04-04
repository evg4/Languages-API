const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const foodRouter = express.Router();

foodRouter.use(morgan("tiny"));
foodRouter.use(bodyParser.json());

const food = [
  { name: "chicken", type: "meat" },
  { name: "salmon", type: "fish" },
];

//Get all food

//Get specific food

//Get by type
