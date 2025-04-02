import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  redditId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  iconImg: String,
  created: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  viewedPosts: [{ 
    postId: { type: Number, required: true },
    viewedAt: { type: Date, default: Date.now }
  }]
});

export const User = mongoose.model('User', userSchema);