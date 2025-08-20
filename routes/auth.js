const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Simple nickname-based login (no password required)
router.post('/login', async (req, res) => {
  try {
    const { nickname } = req.body;

    if (!nickname || nickname.trim().length < 2) {
      return res.status(400).json({ message: 'Rumuz en az 2 karakter olmalıdır' });
    }

    // Find or create user by nickname
    let user = await User.findOne({ nickname: nickname.trim() });
    
    if (!user) {
      // Create new user with nickname
      user = new User({
        nickname: nickname.trim(),
        storiesWritten: 0,
        totalLikes: 0
      });
      await user.save();
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        nickname: user.nickname,
        stories_written: user.storiesWritten,
        total_likes: user.totalLikes
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user._id,
      nickname: user.nickname,
      stories_written: user.storiesWritten,
      total_likes: user.totalLikes
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
