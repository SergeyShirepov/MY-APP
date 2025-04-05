import { User } from '../../models/User.js';

export const upsertUser = async (req, res) => {
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
};