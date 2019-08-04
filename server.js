const express = require('express');

const config = require('./src/config')();
const logger = require('./src/logger')(config.log);
const app = express();

const db = require('./src/db');
const controllers = require('./src/controllers')(config, logger);
const middleware = require('./src/middleware');
const router = require('./src/routes');

// init db
db.init(config.db);

middleware.init(app, logger);
app.use(router(controllers, logger));

app.listen(config.server.port, () => {
  logger.debug(`listening on: ${config.server.port}`);
});