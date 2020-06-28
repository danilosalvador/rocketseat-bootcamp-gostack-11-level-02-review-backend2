import express from 'express';
import 'reflect-metadata';

import './database';

const app = express();

app.get('/', (request, response) => {
  return response.json({ ok: true });
});

app.listen(3333, () => {
  console.log('The rocket was lanched 🚀');
});
