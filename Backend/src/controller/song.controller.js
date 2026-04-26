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
  const { mood, title } = req.body;

  // ✅ Read tags once
  const tags = id3.read(songBuffer);

  // ✅ Remove .mp3 extension from filename for clean title
  const filenameTitle = req.file.originalname.replace(/\.[^/.]+$/, "");

  // ✅ Try all 3 sources in order
  const songTitle = tags.title || title || filenameTitle;

  if (!songTitle) {
    return res.status(400).json({
      error: "Could not determine song title"
    });
  }

  const hasImage = Boolean(tags.image?.imageBuffer);

  try {
    const uploadPromises = [
      storageService.uploadFile({
        buffer: songBuffer,
        filename: `${songTitle}.mp3`,
        folder: "/cohort-2/moodify/songs"
      }),
      hasImage
        ? storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: `${songTitle}.jpeg`,
            folder: "/cohort-2/moodify/posters"
          })
        : Promise.resolve(null)
    ];

    const [songFile, posterFile] = await Promise.all(uploadPromises);

    const song = await songModel.create({
      title: songTitle,           // ✅ uses fallback title
      url: songFile.url,
      posteUrl: posterFile?.url || null,
      mood
    });

    res.status(201).json({
      message: "song created successfully",
      song
    });

  } catch (error) {
    console.error("Upload failed:", error.message);
    res.status(500).json({
      error: "Song upload failed. Please try again."
    });
  }
}

module.exports = { uploadSong };