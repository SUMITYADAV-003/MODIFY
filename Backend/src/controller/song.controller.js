const  songModel = require("../models/song.models");
const storageService = require("../service/Storage.service")
const  id3 = require("node-id3");



async function uploadSong(req, res) {
  const songBuffer = req.file.songBuffer
  const {mood} = req.body;
  const tags = id3.read(songBuffer);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadeFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/cohort-2/moodify/songs"
    }),
    storageService.uploadeFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".mp3",
      folder: "/cohort-2/moodify/posters"
    })
  ])


}



module.exports = {uploadSong};