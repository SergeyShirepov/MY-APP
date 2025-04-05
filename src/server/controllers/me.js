import axios from 'axios';

export const getMe = async (req, res) => {
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
};