const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const food = require("./data/foodData.js");

const foodRouter = express.Router();

foodRouter.use(morgan("tiny"));
foodRouter.use(bodyParser.json());

//Get all food
foodRouter.get("", (req, res, next) => {
  res.send(food);
});

//Get specific food

//Get by type

module.exports = foodRouter;
