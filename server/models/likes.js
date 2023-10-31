const mongoose = require('mongoose');

const songlikeSchema = new mongoose.Schema({
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song', // Reference to the BlogPost model
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const SongLikeSchema = mongoose.model('songlike', songlikeSchema);

module.exports = SongLikeSchema;