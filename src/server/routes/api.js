import express from 'express';
import {
  getPosts,
  getPostById,
  updatePostKarma
} from '../controllers/posts.js';
import { getToken, authHandler } from '../controllers/auth.js';
import { getMe } from '../controllers/me.js';
import { upsertUser } from '../controllers/users.js';

const router = express.Router();

// Posts роутер
router.get('/posts', getPosts);
router.get('/posts/:postId', getPostById);
router.put('/posts/:postId/karma', updatePostKarma);

// Auth роутер
router.get('/token', getToken);
router.get('/auth', authHandler);

// User роутер
router.get('/me', getMe);
router.post('/user/upsert', upsertUser);

export default router;