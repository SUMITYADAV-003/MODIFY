const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posteUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});


const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;