const express = require('express');
const app = express();

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Log4js = require('log4js');
var logger = Log4js.getLogger();
logger.level = "info";

// parser application/json
app.use(bodyParser.json());

app.use(cookieParser("Hash:IDAE@#43224-e324ddewer"));

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

require("dotenv-safe").config({
  allowEmptyValues: true
});

const championshipGamesController = require('./src/main/controller/ChampionshipGamesController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', championshipGamesController);

app.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_HOST, () => {
  logger.info(`WinnChay BackEnd server running in port ${process.env.EXPRESS_PORT}...`);
});