import mongoose from 'mongoose';
import { Post } from './Post.js';

// Данные для добавления
const posts = [
    {
        id: 1,
        title: 'Противоположная точка зрения на данную проблему',
        cardPreview: '/static/images/6752015f611bbf6dae5d5d1bfca3a222.jpg',
        timePublished: '2023-10-01T12:00:00Z',
        timeViewed: '2023-10-02T12:00:00Z',
        avtor: 'Дмитрий Гришин',
        avatar: '/static/images/123.png',
        karmaValue: 456,
      },
      {
        id: 2,
        title: 'Но представители современных социальных течений',
        cardPreview: '/static/images/361f7fe484a1d5fe23f05c2ae80dbd98.jpg',
        timePublished: '2024-10-03T12:00:00Z',
        timeViewed: '2024-10-04T12:00:00Z',
        avtor: 'Дмитрий Гришин',
        avatar: '/static/images/aa27b0b476c3a1694ceb93619c3336a2.jpg',
        karmaValue: 645,
      },
      {
        id: 3,
        title: 'А также базовые сценарии поведения пользователей сервиса',
        cardPreview: '/static/images/670447d550716c884bd7f1ad19bfa99d.jpg',
        timePublished: '2023-10-05T12:00:00Z',
        timeViewed: '2023-10-06T12:00:00Z',
        avtor: 'Дмитрий Гришин',
        avatar: '/static/images/163929ed4b94a92fcf4b8095dec463e4.jpg',
        karmaValue: 110,
      },
      {
        id: 4,
        title: 'Реплицированные с зарубежных источников возможности ',
        cardPreview: '/static/images/e5d2d790ca94d6ed078240f276db11f9.jpg',
        timePublished: '2022-10-07T12:00:00Z',
        timeViewed: '2022-10-08T12:00:00Z',
        avtor: 'Дмитрий Гришин',
        avatar: '/static/images/78cb15be0e98336709f47fcc97224b40.jpg',
        karmaValue: 104,
      },
      {
        id: 5,
        title: 'Не следует, однако, забывать, что современная обстановка ',
        cardPreview: '/static/images/8a03043dacfd556eacce5ae1beb4d073.jpg',
        timePublished: '2023-10-09T12:00:00Z',
        timeViewed: '2023-10-10T12:00:00Z',
        avtor: 'Дмитрий Гришин',
        avatar: '/static/images/29b238fbdba8a13367c5ba34892f0341.jpg',
        karmaValue: 176,
      },
      {
        id: 6,
        title: 'Равным образом, перспективное планирование помогает узнать всё что нужно',
        cardPreview: '/static/images/027057f736a538954b047ebbd742a36c.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Дмитрий Гришин',
        avatar: '/static/images/0ca6a655c3e85932027ca9c3a8f8b13d.jpg',
        karmaValue: 234,
      },
      {
        id: 7,
        title: 'А ещё диаграммы связей ограничены исключительно',
        cardPreview: '/static/images/9f2d972393291d264f5714e97bc3fdf7.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Рашид Гаев',
        avatar: '/static/images/d5bfbc966738da2bd35395967c9a1754.jpg',
        karmaValue: 345,
      },
      {
        id: 8,
        title: 'Вот вам яркий пример современных тенденций',
        cardPreview: '/static/images/050c2a67a7a6312771a79882c0309033.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Мария Белова',
        avatar: '/static/images/eeadb05bd433a816487cb204f7b15a3e.jpg',
        karmaValue: 53,
      },
      {
        id: 9,
        title: 'Являясь всего лишь частью общей картины, сторонники',
        cardPreview: '/static/images/3bc3712f73583c3da512d653611c8b7c.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Инга Золотова',
        avatar: '/static/images/30c62d8876aae07c862c94bcd47c391c.jpg',
        karmaValue: 2,
      },
      {
        id: 10,
        title: 'Идейные соображения высшего порядка',
        cardPreview: '/static/images/e9f359e7307fb922d3f05764ddde2a70.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Арсен Кааянц',
        avatar: '/static/images/917a8c7c98dcafff723bccecbf9dd539.jpg',
        karmaValue: 324,
      },
      {
        id: 11,
        title: 'И нет сомнений, что многие известные личности значимы',
        cardPreview: '/static/images/3adea03f65c4884b4733d6dd9289de1f.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Мария Белова',
        avatar: '/static/images/eeadb05bd433a816487cb204f7b15a3e.jpg',
        karmaValue: 12,
      },
      {
        id: 12,
        title: 'Не следует, однако, забывать, что современная обстановка ',
        cardPreview: '/static/images/fdea71b77982ed24ae744c87a93e5bab.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Виктор Пылёв',
        avatar: '/static/images/8cbe7d2546755e0333cd6eebc66b4386.jpg',
        karmaValue: 24,
      },
      {
        id: 13,
        title: 'Равным образом, перспективное планирование помогает узнать всё...',
        cardPreview: '/static/images/027057f736a538954b047ebbd742a36c.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Владислав Куняев',
        avatar: '/static/images/0ca6a655c3e85932027ca9c3a8f8b13d.jpg',
        karmaValue: 5,
      },
      {
        id: 14,
        title: 'С другой стороны, курс на социально-ориентированный',
        cardPreview: '/static/images/acf19a4b292173a2ca6ea0470686c272.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Алексей Минаев',
        avatar: '/static/images/281aa067a45f28630b0e6bbc85f7a687.jpg',
        karmaValue: 456,
      },
      {
        id: 15,
        title: 'Прежде всего, семантический разбор внешних противодействий',
        cardPreview: '/static/images/9bdb4efbaccad0ac6a01719e1ffb820d.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Инна Семёнова',
        avatar: '/static/images/ceb17f0a2c236eb7ea1c4dfb38af6b24.jpg',
        karmaValue: 67,
      },
      {
        id: 16,
        title: 'Есть над чем задуматься: некоторые особенности внутренней',
        cardPreview: '/static/images/f50df9ba60acfcfa1052ff0b7ae18c8f.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Олег Звеньев',
        avatar: '/static/images/b741c992952abd58393cac9b729ea13c.jpg',
        karmaValue: 3,
      },
      {
        id: 17,
        title: 'Предварительные выводы неутешительны: курс доллара',
        cardPreview: '/static/images/990a8721be49385071f52cadb5cb6b24.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'София Ломова',
        avatar: '/static/images/5e6dca4423329dd52bf9df2bdfeb2b93.jpg',
        karmaValue: 45,
      },
      {
        id: 18,
        title: 'Для современного мира повышение уровня гражданского',
        cardPreview: '/static/images/dc3e51054cce6d6fa871718494ae06e0.jpg',
        timePublished: '2023-10-11T12:00:00Z',
        timeViewed: '2023-10-12T12:00:00Z',
        avtor: 'Дмитрий Швец',
        avatar: '/static/images/34bfb238ea654d377506fe099501b3fc.jpg',
        karmaValue: 456,
      },
];

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/My-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));
  
  // Функция для добавления постов
  const seedDatabase = async () => {
    try {
      // Очистка коллекции перед добавлением новых данных (опционально)
      await Post.deleteMany({});
  
      // Добавление постов
      await Post.insertMany(posts);
      console.log('Data seeded successfully');
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      // Закрытие соединения с базой данных
      mongoose.connection.close();
    }
  };
  
  // Запуск функции
  seedDatabase();