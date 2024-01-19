import Joi from 'joi';
import { BadRequestError } from '../services/error.service';
import { ILoginPayload, ISignupPayload } from '../interfaces/auth.interface';

export const signupValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(3).required(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email(),
  username: Joi.string(),
  password: Joi.string().min(6).required(),
});

export const validateAndThrow = async (schema: Joi.ObjectSchema, payload: ILoginPayload | ISignupPayload) => {
  try {
    await schema.validateAsync(payload);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new BadRequestError(error.message);
  }
};
