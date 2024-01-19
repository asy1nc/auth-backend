import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const AuthRouter = Router();

AuthRouter.post('/signup', async (req, res, next) => {
    await AuthController('signup', req.body)
})

AuthRouter.post('/login', async (req, res, next) => {
    await AuthController('login', req.body)
})

export default AuthRouter;