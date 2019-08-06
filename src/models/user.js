const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  display_name: String,
  f_name: String,
  l_name: String,
  email: {
    type: String,
    unique: true
  },
  photo: Buffer,
  bio: String,
  friends: Array,
  password: String,
  last_login: Date
});

module.exports = model('User', userSchema);