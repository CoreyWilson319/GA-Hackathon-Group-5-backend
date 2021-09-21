const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  pet_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    require: true,
  },
});

module.exports = Meal = mongoose.model("meal", EventSchema);
