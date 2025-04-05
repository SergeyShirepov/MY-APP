import { Post } from '../../models/Post.js';
import { User } from '../../models/User.js';

export const getPosts = async (req, res) => {
  try {
    // Преобразуем параметры в числа и задаем значения по умолчанию
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;
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
};

export const getPostById = async (req, res) => {
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
};

export const updatePostKarma = async (req, res) => {
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
};