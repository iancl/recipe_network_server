const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const localOpts = {
  usernameField: 'u',
  passwordField: 'p',
  session: false
}

function register(username, password, done) {
  console.log("asdasdasdasdasdasdasd-------------------------");
}

module.exports.setup = function (logger) {
  passport.use(
    'register',
    new LocalStrategy(localOpts, register));
};