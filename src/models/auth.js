const { Schema, model } = require('mongoose');

const authSchema = {
  user_id: Schema.Types.ObjectId,
  password: String,
  last_login: Date
};

module.exports = model('Auth', authSchema);