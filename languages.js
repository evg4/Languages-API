const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
//const languages = require("./data/languagesData.js");

const languagesRouter = express.Router();

let languages = [];

fs.readFile("./data/languagesData.json", (err, data) => {
  if (err) {
    throw err;
  }
  languages = JSON.parse(data);
});

languagesRouter.use(morgan("tiny"));
languagesRouter.use(bodyParser.json());

const saveLanguagesData = () => {
  fs.writeFile(
    "./data/languagesData.json",
    JSON.stringify(languages, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing file:", err);
      }
    }
  );
};

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

//Add new language
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

//Update existing language
languagesRouter.put("/:language", validateLanguage, (req, res, next) => {
  const newLang = req.body;
  languages[req.langIndex] = newLang;
  saveLanguagesData();
  res.status(201).send(languages[req.langIndex]);
});

module.exports = languagesRouter;
