import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const AuthRouter = Router();

AuthRouter.post('/signup', async (req, _, next) => {
  await AuthController('signup', req.body, next);
});

AuthRouter.post('/login', async (req, _, next) => {
  await AuthController('login', req.body, next);
});

export default AuthRouter;
