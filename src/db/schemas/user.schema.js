const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: [String],
    required: false,
  },
});

module.exports = userSchema;
