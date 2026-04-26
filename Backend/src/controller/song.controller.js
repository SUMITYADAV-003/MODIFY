const songModel = require("../models/song.models");
const storageService = require("../service/Storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  // ✅ Safety check FIRST
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({
      error: "No file uploaded or file is invalid"
    });
  }

  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  // ✅ Read tags once and store results
  const tags = id3.read(songBuffer);

  if (!tags.title) {
    return res.status(400).json({
      error: "MP3 file must have a title in its metadata"
    });
  }

  const hasImage = Boolean(tags.image?.imageBuffer);

  try {
    // ✅ Start DB save + uploads ALL at the same time
    // Build all promises together upfront
    const uploadPromises = [
      storageService.uploadFile({
        buffer: songBuffer,
        filename: `${tags.title}.mp3`,
        folder: "/cohort-2/moodify/songs"
      }),
      hasImage
        ? storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: `${tags.title}.jpeg`,
            folder: "/cohort-2/moodify/posters"
          })
        : Promise.resolve(null) // ✅ No waiting, resolve immediately
    ];

    // ✅ Both uploads run truly in parallel
    const [songFile, posterFile] = await Promise.all(uploadPromises);

    // ✅ Save to DB right after uploads finish
    const song = await songModel.create({
      title: tags.title,
      url: songFile.url,
      posteUrl: posterFile?.url || null,
      mood
    });

    res.status(201).json({
      message: "song created successfully",
      song
    });

  } catch (error) {
    // ✅ Catch errors so requests don't hang forever
    console.error("Upload failed:", error.message);
    res.status(500).json({
      error: "Song upload failed. Please try again."
    });
  }
}

module.exports = { uploadSong };