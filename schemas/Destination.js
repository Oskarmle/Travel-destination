const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: "City must be filled out",
  },
  country: {
    type: String,
    required: "Country must be filled out",
  },
  description: {
    type: String,
    required: "Description must be filled out",
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
