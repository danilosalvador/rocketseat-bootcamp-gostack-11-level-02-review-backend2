import express from 'express';
import 'reflect-metadata';

import './database';
import logRequest from './middlewares/logRequest';
import appError from './middlewares/appError';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(logRequest);

app.use(routes);

app.use(appError);

app.listen(3333, () => {
  console.log('The rocket was lanched 🚀');
});
