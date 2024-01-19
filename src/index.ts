import express from 'express';
import AuthRouter from './routers/auth.router';
import ErrorMiddleware from './middlewares/error.middleware';

const app = express();
const base = '/api/v1';

app.use(express.json());

app.get(`${base}/`, (_, res) => {
  res.send('OK');
});

app.use(`${base}/auth`, AuthRouter);

app.use(ErrorMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
