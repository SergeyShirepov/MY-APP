import { Post } from '../../models/Post.js';
import { User } from '../../models/User.js';

export const getPostsWithViewInfo = async (req) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = parseInt(req.query.offset, 10) || 0;
  const { sortBy, searchBy } = req.query;
  
  let sort = {};
  let query = {};

  if (searchBy && typeof searchBy === 'string') {
    query = { title: { $regex: searchBy, $options: 'i' } };
  }

  switch (sortBy) {
    case 'karma': sort = { karmaValue: -1 }; break;
    case 'date': sort = { timePublished: -1 }; break;
    default: sort = { id: 1 };
  }

  const userName = req.headers['x-user-name'];
  let viewedPosts = [];
  
  if (userName) {
    const user = await User.findOne({ name: userName });
    if (user) {
      viewedPosts = user.viewedPosts.map(vp => vp.postId);
    }
  }

  const posts = await Post.find(query).sort(sort).skip(offset).limit(limit);
  const totalPosts = await Post.countDocuments(query);
  const hasMore = offset + limit < totalPosts;

  const postsWithViewInfo = posts.map(post => ({
    ...post.toObject(),
    isViewed: viewedPosts.includes(post.id)
  }));

  return { posts: postsWithViewInfo, hasMore };
};

export const getPostAndUpdateViews = async (req) => {
  const { postId } = req.params;
  const userName = req.headers['x-user-name'];

  const post = await Post.findOne({ id: Number(postId) });
  if (!post) throw new Error('Пост не найден');

  if (userName) {
    await updateUserViewHistory(userName, postId);
  }

  return post;
};

const updateUserViewHistory = async (userName, postId) => {
  const existingView = await User.findOne({
    name: userName,
    'viewedPosts.postId': Number(postId)
  });

  if (existingView) {
    await User.findOneAndUpdate(
      { name: userName, 'viewedPosts.postId': Number(postId) },
      { $set: { 'viewedPosts.$.viewedAt': new Date(), lastLogin: new Date() } },
      { new: true }
    );
  } else {
    await User.findOneAndUpdate(
      { name: userName },
      {
        $push: { viewedPosts: { postId: Number(postId), viewedAt: new Date() } },
        $set: { lastLogin: new Date() }
      },
      { upsert: true, new: true }
    );
  }
};

export const updateKarma = async (req) => {
  const { postId } = req.params;
  const { delta } = req.body;

  if (typeof delta !== 'number' || (delta !== 1 && delta !== -1)) {
    throw new Error('Неправильное значение delta');
  }

  const post = await Post.findOneAndUpdate(
    { id: Number(postId) },
    { $inc: { karmaValue: delta } },
    { new: true }
  );

  if (!post) throw new Error('Пост не найден');
  
  return { karmaValue: post.karmaValue };
};