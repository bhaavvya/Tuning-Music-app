const Song = require("../models/song");

const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find({});
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getAllSongs ;
