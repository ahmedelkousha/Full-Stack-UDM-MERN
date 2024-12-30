const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
 
  },
  Email: {
    type: String,
   
  },
  Age: {
    type: Number,
    
  },
});

const userInfo = mongoose.model("users", userSchema);
module.exports = userInfo;
