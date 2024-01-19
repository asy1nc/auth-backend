import AuthService from '../services/auth.service';
import { ILoginPayload, ISignupPayload } from '../interfaces/auth.interface';
import { signupValidation, loginValidation, validateAndThrow } from '../validations/auth.validation';
import { NextFunction } from 'express';

async function AuthController(type: 'login' | 'signup', payload: ISignupPayload | ILoginPayload, next: NextFunction) {
  try {
    if (type === 'login') {
      await validateAndThrow(loginValidation, payload as ILoginPayload);
    } else {
      await validateAndThrow(signupValidation, payload as ISignupPayload);
    }

    const authService = new AuthService();

    const user = await authService[type](payload);

    return user;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
}

export default AuthController;
