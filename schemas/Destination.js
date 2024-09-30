const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: "City must be filled out",
  },
  country: String,
  description: String,
});

module.exports = mongoose.model("Destination", destinationSchema);
