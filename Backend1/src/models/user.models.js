const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username must be required "],
    unique: [true, "username must be unique "],
  },
  email: {
    type: String,
    required: [true, "email must be required "],
    unique: [true, "email must be unique "],
  },
  password: {
    type: String,
    required: [true, "password must be required "],
    select: false,
    
  },

})


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;