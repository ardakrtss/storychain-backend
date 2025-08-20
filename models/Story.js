const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  theme: {
    type: String,
    required: true,
    enum: ['fantastik', 'gizem', 'bilim-kurgu', 'macera', 'sifir-atik', 'iklim-degisikligi']
  },
  segments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxlength: 1000
    },
    order: {
      type: Number,
      required: true
    }
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likeCount: {
    type: Number,
    default: 0
  },
  characters: {
    type: String,
    required: true
  },
  plotHints: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Update like count before saving
storySchema.pre('save', function(next) {
  this.likeCount = this.likes.length;
  next();
});

module.exports = mongoose.model('Story', storySchema);
