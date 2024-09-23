import express from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { App } from '../App.tsx';
import { indexTemplate } from './indexTemplate.tsx';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use('/static', express.static(path.join(__dirname, '../../dist/client')));

app.get('/', (req, res) => {
  const appString = ReactDOMServer.renderToString(App());
  res.send(indexTemplate(appString));
});

app.get('/auth', (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=https://localhost:3000/auth`,
    {
      auth: {username: process.env.CLIENT_ID, password: ''},
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    }
  )
.then(({ data }) =>{
  res.send(
    indexTemplate(ReactDOM.renderToString(App(), data['access_token'])),
  );
})
});


// app.get('/auth', async (req, res) => {
//   try {
//     const response = await axios.post('https://www.reddit.com/api/v1/access_token', new URLSearchParams({
//       grant_type: 'authorization_code',
//       code: req.query.code,
//       redirect_uri: 'http://localhost:3000/auth'
//     }), {
//       auth: {
//         username: 'YOUR_CLIENT_ID', // Замените на ваш клиентский идентификатор
//         password: 'YOUR_CLIENT_SECRET' // Замените на ваш клиентский секрет
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error.response ? error.response.data : error.message);
//     res.status(500).send('Error fetching data');
//   }
// });
///////////////

app.listen(3000, () => {
  console.log('SSR Server started on http://localhost:3000');
});