const express = require('express');
const Story = require('../models/Story');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get completed stories
router.get('/completed', async (req, res) => {
  try {
    const stories = await Story.find({ isCompleted: true })
      .populate('segments.author', 'username')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get stories by theme
router.get('/theme/:theme', async (req, res) => {
  try {
    const stories = await Story.find({ 
      theme: req.params.theme,
      isCompleted: true 
    })
      .populate('segments.author', 'username')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate('segments.author', 'username');
    
    if (!story) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new story
router.post('/', auth, async (req, res) => {
  try {
    const { title, theme, content, characters, plotHints } = req.body;

    const story = new Story({
      title,
      theme,
      characters,
      plotHints,
      segments: [{
        author: req.user._id,
        content,
        order: 1
      }]
    });

    await story.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { storiesWritten: 1 }
    });

    res.status(201).json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Continue existing story
router.post('/:id/continue', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }

    if (story.isCompleted) {
      return res.status(400).json({ message: 'Bu hikaye zaten tamamlanmış' });
    }

    // Check if user already contributed
    const hasContributed = story.segments.some(segment => 
      segment.author.toString() === req.user._id.toString()
    );

    if (hasContributed) {
      return res.status(400).json({ message: 'Bu hikayeye zaten katkıda bulundunuz' });
    }

    // Add new segment
    story.segments.push({
      author: req.user._id,
      content,
      order: story.segments.length + 1
    });

    // Check if story is completed (5 segments)
    if (story.segments.length >= 5) {
      story.isCompleted = true;
    }

    await story.save();

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { storiesWritten: 1 }
    });

    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available stories to continue
router.get('/available/continue', auth, async (req, res) => {
  try {
    const stories = await Story.find({
      isCompleted: false,
      'segments.author': { $ne: req.user._id }
    })
      .populate('segments.author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Like/unlike story
router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    
    if (!story) {
      return res.status(404).json({ message: 'Hikaye bulunamadı' });
    }

    const likeIndex = story.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Unlike
      story.likes.splice(likeIndex, 1);
    } else {
      // Like
      story.likes.push(req.user._id);
    }

    await story.save();
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular stories
router.get('/popular/liked', async (req, res) => {
  try {
    const stories = await Story.find({ isCompleted: true })
      .populate('segments.author', 'username')
      .sort({ likeCount: -1, createdAt: -1 })
      .limit(10);
    
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
