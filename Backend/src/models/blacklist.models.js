const mongoose = require("mongoose");


const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required for BlackListing"],
  }
}, {timestamps: true});



const BlacklistingModels = mongoose.model("Blacklisting", BlacklistSchema);

module.exports = BlacklistingModels;