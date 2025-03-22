import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  cardPreview: { type: String, required: true },
  timePublished: { type: Date, default: Date.now },
  timeViewed: { type: Date, default: Date.now },
  avtor: { type: String, required: true },
  avatar: { type: String, required: true },
  karmaValue: { type: Number, required: true },
});

export const Post = mongoose.model('Post', PostSchema);

