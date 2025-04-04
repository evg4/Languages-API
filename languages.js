const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const languagesRouter = express.Router();

languagesRouter.use(morgan("tiny"));
languagesRouter.use(bodyParser.json());

const languages = [
  {
    language: "English",
    romanAlphabet: true,
    countries: ["UK", "USA", "Australia"],
  },
  {
    language: "German",
    romanAlphabet: true,
    countries: ["Germany", "Austria", "Switzerland"],
  },
  {
    language: "Spanish",
    romanAlphabet: true,
    countries: [
      "Spain",
      "Mexico",
      "Chile",
      "Peru",
      "Costa Rica",
      "Dominican Republic",
      "Puerto Rico",
    ],
  },
  {
    language: "Italian",
    romanAlphabet: true,
    countries: ["Italy", "Switzerland"],
  },
  {
    language: "Chinese",
    romanAlphabet: false,
    countries: ["China", "Hong Kong"],
  },
  {
    language: "Russian",
    romanAlphabet: false,
    countries: "Russia",
  },
];

const validateLanguage = (req, res, next) => {
  const languageRequested = req.params.language;
  const langIndex = languages.findIndex(
    (lang) => lang.language === languageRequested
  );
  if (langIndex === -1) {
    res.status(400).send("Language not found");
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
    res.status(201).send(newLang);
  } else {
    res.status(403).send("That language already exists");
  }
});

//Update existing language
languagesRouter.put("/:language", validateLanguage, (req, res, next) => {
  const newLang = req.body;
  languages[req.langIndex] = newLang;
  res.status(201).send(languages[req.langIndex]);
});

module.exports = languagesRouter;
