const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "YOU NEED A NAME",
  },
  lastName: {
    type: String,
    required: "LASTNAME???",
  },
  email: {
    type: String,
    required: "YOU MUST ENTER A VALID EMAIL",
    unique: true,
  },
  password: {
    type: String,
    required: "You must create a password",
    minlength: 4,
    maxlength: 6,
  },
});

module.exports = mongoose.model("User", userSchema);
