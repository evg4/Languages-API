## Title
Languages API
## Description 
This project has two small data sets - one called Languages and one called Food. I built an Express server to allow API requests to interact with the data. Food only had GET requests; Languages also has some PUT and POST requests, which use the fs module to update the data in a JSON file. The purpose of this project was to practise building a server and using middleware. Some were imported, e.g. morgan and bodyParser, and some I created myself for use with my data specifically, e.g. validateLanguage. 
## How to [install/run/] use
### 1. Clone the repository

Run the following command to clone the repository:

```bash
git clone https://github.com/evg4/Languages-API.git

### 2. Install dependencies

```bash
cd Languages-API
npm install

### 3. Start the server

```bash
npm start

### API endpoints

|Method|Endpoint|Description|Request body/params|
|------|--------|-----------|-------------------|
|GET|/languages|Returns array of all languages|NA|
|GET|/languages/:language|Returns an object of a given language|URL param: languageName|
|GET|/languages/countries/:language\Returns an array of countries where a given language is spoken|URL param: languageName|
|POST|/languages|Adds a new language object to the languages array|JSON body: {"language": string, "romanAlphabet": boolean, "countries": array of strings}|
|PUT|/languages/:language|Updates an existing language object|JSON body: {"language": string, "romanAlphabet": boolean, "countries": array of strings}|
|GET|/food|Returns array of all food, with the option to filter by type|Optional query param: type|
|GET|/food/:food|Returns an object of a given food|URL param: foodName


## Credits
Learnings from Codecademy Full-Stack Engineering pathway.
## Licence
Please see license document.
