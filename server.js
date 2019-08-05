const express = require('express');
const fs = require('fs');
const config = require('./src/config')();
const logger = require('./src/logger')(config.log);
const app = express();
const db = require('./src/db');
const controllers = require('./src/controllers')(config, logger);
const middleware = require('./src/middleware');
const router = require('./src/routes');
const jwt = require('./src/utils/jwt');

async function start() {
  try {

    // TODO: find a better way to do this.
    // adding keys to config object for now. Doing this so that we don't have
    // to read the keys from HDD for every request
    config.auth.privateKeyBuffer = fs.readFileSync(config.auth.privateKeyUrl);
    config.auth.publicKeyBuffer = fs.readFileSync(config.auth.publicKeyUrl);

    await db.init(config.db);

    middleware.init(app);
    app.use(router(config, controllers, logger));

    app.listen(config.server.port, () => {
      logger.debug(`listening on: ${config.server.port}`);
    });
  }
  catch (err) {
    logger.info('cant start server');
    logger.error(err);
  }
}

start();