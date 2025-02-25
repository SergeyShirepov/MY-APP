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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware для обработки кук
app.use(cookieParser());

// Добавляем middleware для CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Добавляем отдельный middleware для mockServiceWorker.js
app.use('/mockServiceWorker.js', express.static(path.join(__dirname, '../../dist/client/mockServiceWorker.js')));

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

      const appString = ReactDOMServer.renderToString(React.createElement(App));
      res.send(indexTemplate(appString));
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