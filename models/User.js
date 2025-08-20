const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 20
  },
  storiesWritten: {
    type: Number,
    default: 0
  },
  likedStories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
  }],
  totalLikes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
