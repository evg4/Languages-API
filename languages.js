const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");

const languagesRouter = express.Router();

//initialise languages array
let languages = [];

//read from the JSON file and save that into the languages array
fs.readFile("./data/languagesData.json", (err, data) => {
  if (err) {
    throw err;
  }
  languages = JSON.parse(data);
});

languagesRouter.use(morgan("tiny"));
languagesRouter.use(bodyParser.json());

//define logic to update the JSON file - to be used in PUT, POST and DELETE requests
const saveLanguagesData = () => {
  fs.writeFile(
    "./data/languagesData.json",
    JSON.stringify(languages, null, 2),
    (err) => {
      if (err) {
        console.log("Error writing file: ", err);
      }
    }
  );
};

//middleware to check that the language in the request exists in the array
const validateLanguage = (req, res, next) => {
  const languageRequested = req.params.language;
  const langIndex = languages.findIndex(
    (lang) => lang.language === languageRequested
  );
  if (langIndex === -1) {
    return res.status(400).send("Language not found");
  }
  req.langIndex = langIndex;
  next();
};

//Get all languages
languagesRouter.get("", (req, res, next) => {
  res.send(languages);
});

//Get one language
languagesRouter.get("/:language", validateLanguage, (req, res, next) => {
  res.send(languages[req.langIndex]);
});

//Get countries by language
languagesRouter.get(
  "/countries/:language",
  validateLanguage,
  (req, res, next) => {
    res.send(languages[req.langIndex].countries);
  }
);

//Post - add new language
languagesRouter.post("", (req, res, next) => {
  const newLang = req.body;
  const checkDuplicate = languages.findIndex(
    (lang) => lang.language === newLang.language
  );
  if (checkDuplicate === -1) {
    languages.push(newLang);
    saveLanguagesData();
    return res.status(201).send(newLang);
  }
  return res.status(403).send("That language already exists");
});

//Put - update existing language
languagesRouter.put("/:language", validateLanguage, (req, res, next) => {
  const newLang = req.body;
  languages[req.langIndex] = newLang;
  saveLanguagesData();
  res.status(201).send(languages[req.langIndex]);
});

module.exports = languagesRouter;
