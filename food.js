const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const food = require("./data/foodData.js");

const foodRouter = express.Router();

foodRouter.use(morgan("tiny"));
foodRouter.use(bodyParser.json());

const validateFood = (req, res, next) => {
  const foodToFind = req.params.food;
  const foodIndex = food.findIndex((food) => food.name === foodToFind);
  if (foodIndex === -1) {
    return res.status(400).send("Food not found");
  }
  req.foodIndex = foodIndex;
  next();
};

//Get all food, or filter by type
foodRouter.get("", (req, res) => {
  const foodType = req.query.type;
  if (foodType) {
    const typeArray = [];
    food.forEach((food) => {
      if (food.type === foodType) {
        typeArray.push(food);
      }
    });
    if (typeArray.length === 0) {
      return res.status(400).send("No foods of that type found");
    }
    return res.send(typeArray);
  }
  return res.send(food);
});

//Get specific food
foodRouter.get("/:food", validateFood, (req, res, next) => {
  res.send(food[req.foodIndex]);
});

module.exports = foodRouter;
