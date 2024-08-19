import express from 'express';
import ReactDOMServer  from 'react-dom/server';
import { App } from '../App.tsx';
import {indexTemplate} from './indexTemplate.js';

const app = express();

app.use('/static', express.static('./dist/client'));

// app.get('/', (req, res) => {
// res.send(
//     indexTemplate(ReactDOMServer.renderToString(App())),
// );
// });


app.get('/auth', (req, res) => {
    // req.query.code;
    res.send(
        indexTemplate(ReactDOMServer.renderToString(App())),
    );
});


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});