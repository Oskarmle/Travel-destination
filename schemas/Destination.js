const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title must be filled out",
  },
  city: {
    type: String,
    required: "City must be filled out",
  },
  country: {
    type: String,
    required: "Country must be filled out",
  },
  dateStart: {
    type: String,
    required: "You must choose a start date"
  },
  dateEnd: {
    type: String,
    required: "You must choose a end date"
  },
  description: {
    type: String,
    required: "Description must be filled out",
  },
  // _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Destination", destinationSchema);
