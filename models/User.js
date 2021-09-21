const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  started: {
    type: Date,
    default: Date.now(),
  },
  pets: [],
});

module.exports = User = mongoose.model("user", UserSchema);
