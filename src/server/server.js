import express from 'express';
import ReactDOMServer  from 'react-dom/server';
import { Header } from '../shared/Header';
import {indexTemplate} from './indexTemplate';

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
res.send(
    indexTemplate(ReactDOMServer.renderToString(Header())),
);
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});