import axios from 'axios';

export const getToken = (req, res) => {
  const token = req.cookies.reddit_token;

  if (!token) {
    return res.status(401).json({ error: 'Токен не найден' });
  }

  res.json({ token });
};

export const authHandler = (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:8080/api/auth`,
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
};