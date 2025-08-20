const express = require('express');
const User = require('../models/User');
const Story = require('../models/Story');
const auth = require('../middleware/auth');

const router = express.Router();

// Get top writers
router.get('/top-writers', async (req, res) => {
  try {
    const topWriters = await User.find()
      .select('username storiesWritten totalLikes')
      .sort({ storiesWritten: -1, totalLikes: -1 })
      .limit(10);
    
    res.json(topWriters);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userStories = await Story.find({
      'segments.author': req.user._id
    });

    const stats = {
      storiesWritten: user.storiesWritten,
      totalLikes: user.totalLikes,
      completedStories: userStories.filter(story => story.isCompleted).length,
      ongoingStories: userStories.filter(story => !story.isCompleted).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
