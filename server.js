const express = require("express");
const app = express();
const languagesRouter = require("./languages.js");

app.use("/languages", languagesRouter);

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
