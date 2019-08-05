const defaults = require('./defaults.json');

module.exports = function () {
  return {
    db: {
      url: process.env.DB_URL || defaults.db.url
    },
    log: {
      level: process.env.LOG_LEVEL || defaults.log.level
    },
    // this must always get overriden by the env var
    auth: {
      secret: process.env.AUTH_SECRET || defaults.auth.secret,
      saltRounds: process.env.SALT_ROUNDS || defaults.auth.salt_rounds,
      tokenExpiration: process.env.TOKEN_EXPIRATION || defaults.auth.token_expiration,
      cookieMaxAge: process.env.COOKIE_MAX_AGE || defaults.auth.cookie_max_age,
      tokenIssuer: process.env.PROCESS_ISSUER || defaults.auth.token_issuer,
      privateKeyUrl: process.env.PRIVATE_KEY_URL || defaults.auth.private_key_url,
      publicKeyUrl: process.env.PUBLIC_KEY_URL || defaults.auth.public_key_url
    },
    server: {
      port: process.env.PORT || defaults.server.port
    }
  };
};
