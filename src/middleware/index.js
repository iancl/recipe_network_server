const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const requestEnder = require('./responder');

module.exports.init = function (app, logger) {
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(passport.initialize())
  app.use(requestEnder());
};