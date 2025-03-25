import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { App } from '../App.tsx';
import { indexTemplate } from './indexTemplate.tsx';
import axios from 'axios';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware для обработки кук
app.use(cookieParser());

// Добавляем middleware для CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware для парсинга JSON
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/My-app', {
})
  .then(() => console.log('Подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB', err));

app.get('/api/posts', async (req, res) => {
  try {
    const { limit, offset, sortBy } = req.query;
    let sort = {};

    switch (sortBy) {
      case 'karma':
        sort = { karmaValue: -1 };
        break;
      case 'date':
        sort = { timePublished: -1 };
        break;
        default:
        sort = { id: 1 };
    }
  

const posts = await Post
  .find()
  .sort(sort)
  .skip(offset)
  .limit(limit);

const totalPosts = await Post.countDocuments();
const hasMore = offset + limit < totalPosts;
res.json({ posts, hasMore });

  } catch (error) {
  console.error('Ошибка загрузки постов', error);
  res.status(500).json({ error: 'Ошибка загрузки постов' });
}
});

// Обновление кармы поста
app.put('/api/posts/:postId/karma', async (req, res) => {
  const { postId } = req.params;
  const { delta } = req.body;

  if (typeof delta !== 'number' || (delta !== 1 && delta !== -1)) {
    return res.status(400).json({ error: 'Неправильное значение delta' });
  }

  try {
    const post = await Post.findOneAndUpdate(
      { id: Number(postId) },
      { $inc: { karmaValue: delta } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ error: 'Пост не найден' });
    }

    res.json({ karmaValue: post.karmaValue });
  } catch (error) {
    console.error('Ошибка обновления кармы:', error);
    res.status(500).json({ error: 'Не удалось обновить карму' });
  }
});

app.use('/static', express.static(path.join(__dirname, '../../dist/client')));

// Обработчик для получения токена из кук
app.get('/api/token', (req, res) => {
  const token = req.cookies.reddit_token;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  res.json({ token });
});

// Обработчик для получения данных пользователя
app.get('/api/me', async (req, res) => {
  const token = req.cookies.reddit_token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await axios.get('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'MyRedditApp/1.0' // Обязательный заголовок для Reddit API
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Reddit API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

app.get('/auth', (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:8080/auth`,
    {
      auth: { username: process.env.CLIENT_ID, password: 'uW5RuT-6oP0vLKBIyjP9w09YyhRmcQ' },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    }
  )
    .then(({ data }) => {
      // Устанавливаем HttpOnly куку с токеном
      res.cookie('reddit_token', data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
        sameSite: 'lax',
        maxAge: 3600000 // 1 час
      });

      res.redirect('http://localhost:8080');
    })
    .catch(error => {
      console.error('Error:', error.response?.data || error.message);
      res.status(500).send('Authorization failed');
    });

});

app.get('*', (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(App));
  res.send(indexTemplate(appString));
});

app.listen(3000, () => {
  console.log('SSR Server started on http://localhost:3000');
});