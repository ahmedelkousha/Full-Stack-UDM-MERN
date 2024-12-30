const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
});

const userInfo = mongoose.model("users", userSchema);
module.exports = userInfo;
