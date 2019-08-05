const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const responder = require('./responder');

/**
 * Initializes _some_ middleware modules
 * @param {expressInstance} app
 */
module.exports.init = function (app) {
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(responder());
};