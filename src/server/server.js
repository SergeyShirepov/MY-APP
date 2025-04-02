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
import { User } from '../models/User.js';


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
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-name']
}));
app.options('*', cors());

// Middleware для парсинга JSON
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/My-app', {
})
  .then(() => console.log('Подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB', err));

app.get('/api/posts', async (req, res) => {
  try {
    // Преобразуем параметры в числа и задаем значения по умолчанию
    const limit = parseInt(req.query.limit, 10) || 10; // Значение по умолчанию, если не указано
    const offset = parseInt(req.query.offset, 10) || 0; // Значение по умолчанию, если не указано
    const { sortBy, searchBy } = req.query;

    let sort = {};
    let query = {};

    // Настраиваем поиск по заголовку, если указан searchBy
    if (searchBy && typeof searchBy === 'string') {
      query = {
        title: { $regex: searchBy, $options: 'i' }
      };
    }

    // Настраиваем сортировку
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

    // Получаем имя пользователя из заголовков (предполагается, что оно передается в 'x-user-name')
    const userName = req.headers['x-user-name'];

    // Получаем список просмотренных постов пользователя
    let viewedPosts = [];
    if (userName) {
      const user = await User.findOne({ name: userName });
      if (user) {
        viewedPosts = user.viewedPosts.map(vp => vp.postId); // Извлекаем postId из viewedPosts
      }
    }

    // Выполняем запрос и получаем массив постов
    const posts = await Post
      .find(query)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    // Добавляем поле isViewed к каждому посту
    const postsWithViewInfo = posts.map(post => ({
      ...post.toObject(), // Преобразуем документ MongoDB в обычный объект
      isViewed: viewedPosts.includes(post.id) // Проверяем, есть ли post.id в viewedPosts
    }));

    // Получаем общее количество постов для пагинации
    const totalPosts = await Post.countDocuments(query);
    const hasMore = offset + limit < totalPosts;

    // Отправляем результат в формате JSON
    res.json({ posts: postsWithViewInfo, hasMore });
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

// Получаем пост по его id
app.get('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const userName = req.headers['x-user-name'];

    // 1. Находим пост
    const post = await Post.findOne({ id: Number(postId) });
    if (!post) return res.status(404).json({ error: 'Пост не найден' });

    // 2. Обновляем историю просмотров
    if (userName) {
      try {
        // Сначала проверяем, есть ли запись с заданным postId в массиве viewedPosts
        const existingView = await User.findOne({
          name: userName,
          'viewedPosts.postId': Number(postId)
        });

        if (existingView) {
          // Если запись с таким postId уже существует, обновляем только viewedAt
          const result = await User.findOneAndUpdate(
            {
              name: userName,
              'viewedPosts.postId': Number(postId)
            },
            {
              $set: {
                'viewedPosts.$.viewedAt': new Date(), // Обновляем viewedAt для найденного элемента
                lastLogin: new Date()
              }
            },
            { new: true } // Возвращаем обновленный документ
          );
        } else {
          // Если записи с таким postId нет, добавляем новую
          const result = await User.findOneAndUpdate(
            { name: userName },
            {
              $push: {
                viewedPosts: {
                  postId: Number(postId),
                  viewedAt: new Date()
                }
              },
              $set: { lastLogin: new Date() }
            },
            { upsert: true, new: true } // Создаем документ, если его нет, и возвращаем обновленный
          );
        }
        console.log('User update result:', result);
      } catch (userError) {
        console.error('Ошибка обновления пользователя:', userError);
      }
    }

    // 3. Возвращаем пост
    res.json(post);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
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
    return res.status(401).json({ error: 'Токен не найден' });
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
    console.error('Ошибка Reddit API:', error.response?.data || error.message);
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
      res.status(500).send('Авторизация не удалась');
    });

});


// Эндпоинт для пользователя
app.post('/api/user/upsert', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Неавторизированный пользователь' });
  }

  try {
    const redditUser = req.body;

    // Ищем или создаем пользователя в MongoDB
    const user = await User.findOneAndUpdate(
      { redditId: redditUser.redditId },
      {
        $set: {
          name: redditUser.name,
          iconImg: redditUser.iconImg,
          lastLogin: new Date()
        },
        $setOnInsert: {
          created: new Date()
        }
      },
      {
        upsert: true,
        new: true,
        runValidators: true
      }
    );

    res.json(user);
  } catch (error) {
    console.error('Ошибка при сохранении пользователя:', error);
    res.status(500).json({ error: 'Сервер недоступен' });
  }
});

app.get('*', (req, res) => {
  const appString = ReactDOMServer.renderToString(React.createElement(App));
  res.send(indexTemplate(appString));
});

app.listen(3000, () => {
  console.log('SSR Server started on http://localhost:3000');
});