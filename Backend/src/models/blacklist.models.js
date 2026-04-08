const mongoose = require("mongoose");


const BlackListingSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required for BlackListing "],
  }
}, {timestamps: true})



const BlackListingModels = mongoose.model("BlacklistingToken", BlackListingSchema);


module.exports = BlackListingModels;