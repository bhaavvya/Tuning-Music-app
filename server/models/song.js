const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
      
    },
    album: {
      type: String,
      required: false,
    },

    imgUrl: {
      type: String,
      required: true,
    },
    songsUrl: {
      type: String,
      required: true,
    },
    likes: [
      {
        liked: {
          type: Boolean,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Assuming you have a User model
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("song", SongSchema);