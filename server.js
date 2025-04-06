const express = require("express");
const app = express();
const languagesRouter = require("./languages.js");
const foodRouter = require("./food.js");

app.use("/languages", languagesRouter);
app.use("/food", foodRouter);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
