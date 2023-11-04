const express = require('express');
const router = express.Router();
const SongLike = require('../models/likes.js');

// POST request to add a new song like
router.post('/like', async (req, res) => {
  const { songId, user } = req.body;
  console.log(user)
  try {
    const newLike = await SongLike.create({ songId, user });
    res.status(201).json(newLike);
  } catch (error) {
    console.error("abcd",error);
    res.status(500).json('Server Error');
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("user id yaha dchkwefbwhebfw",userId)
    const userlikedsongs = await SongLike.find({ userId });
    res.status(200).json(userlikedsongs);
  } catch (error) {
    console.error('Error fetching liked songs:', error);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
