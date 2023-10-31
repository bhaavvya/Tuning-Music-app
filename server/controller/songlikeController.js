const SongLike = require('../models/likes.js');




// Like a blog post

const unlikesong = async (req, res) => {
    const { songId, userId } = req.body;

    try {
        // Find and remove the user's like from the blog post
        const removedLike = await SongLike.findOneAndRemove({ songId, userId });

        // Check if the like was found and removed
        if (!removedLike) {
            return res.status(404).json({ message: 'Blog post not found or like not found' });
        }

        res.json({ message: 'Blog unliked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





const likesong = async (req, res) => {
    try {
        const { songId, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required in the request body.' });
        }

        // Check if the user has already liked the blog post
        const existingLike = await SongLike.findOne({ songId, userId });

        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this blog post.' });
        }

        const newLike = new SongLike({ songId, userId });
        await newLike.save();

        // No need to update the BlogPost model to increase its like count here

        return res.status(200).json({ message: 'Blog post liked successfully.' });
    } catch (error) {
        console.error('Error liking the blog post:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Unlike a blog post


// Get the number of likes for a blog post
const getLikeCount = async (req, res) => {
    try {
        const { songId } = req.params;
        const likeCount = await SongLike.countDocuments({ song: songId });
        return res.status(200).json({ count: likeCount });
    } catch (error) {
        console.error('Error getting like count:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get the list of users who liked a blog post
const getLikedUsers = async (req, res) => {
    try {
        const { songId } = req.params;
        const likedUsers = await SongLike.find({ song: songId }).populate('user', 'username');
        return res.status(200).json(likedUsers);
    } catch (error) {
        console.error('Error getting liked users:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { likesong, unlikesong, getLikeCount, getLikedUsers };