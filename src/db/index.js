const mongoose = require('mongoose');

module.exports.init = function (config) {
  return mongoose.connect(config.url, { useNewUrlParser: true });
};