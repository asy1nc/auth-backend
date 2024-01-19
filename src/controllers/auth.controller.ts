import AuthService from '../services/auth.service';
import { ILoginPayload, ISignupPayload } from '../interfaces/auth.interface';
import { signupValidation, loginValidation, validateAndThrow } from '../validations/auth.validation';
import { Request, Response, NextFunction } from 'express';

async function AuthController(type: 'login' | 'signup', req: Request, res: Response, next: NextFunction) {
  try {
    if (type === 'login') {
      await validateAndThrow(loginValidation, req.body as ILoginPayload);
    } else {
      await validateAndThrow(signupValidation, req.body as ISignupPayload);
    }

    const authService = new AuthService();

    const user = await authService[type](req.body);

    const payloadToReturn = {
      message: `${type} successful`,
      data: user,
    };

    res.status(200).json(payloadToReturn);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
}

export default AuthController;
