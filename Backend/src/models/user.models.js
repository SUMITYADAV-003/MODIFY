const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is must be required "],
    unique: [true, "Username must be unique "],
  },
  email: {
    type: String,
    required: [true, "email is must be required "],
    unique: [true, "email must be unique "],
  },
  password: {
    type: String,
    required: [true, "Password is required "],
     select: false,
  },

  // TASK
// userSchema.pre("save", function (next) { })
// userSchema.post("save", function (next) { })
  

} )

const userModels =  mongoose.model("users", userSchema);

module.exports = userModels;