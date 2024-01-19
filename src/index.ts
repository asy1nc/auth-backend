import express from 'express';
import AuthRouter from './routers/auth.router';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('OK');
})

app.use('/auth', AuthRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})