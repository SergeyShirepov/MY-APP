import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import apiRouter from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware для обработки кук
app.use(cookieParser());

// CORS middleware
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
mongoose.connect('mongodb://localhost:27017/My-app', {})
  .then(() => console.log('Подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB', err));

// API роутер
app.use('/api', apiRouter);

// Статические файлы
app.use('/static', express.static(path.join(__dirname, '../../dist/client')));

export default app;