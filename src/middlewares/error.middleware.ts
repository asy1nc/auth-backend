import * as errors from '../services/error.service';
import { NextFunction, Request, Response } from 'express';

const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof errors.BaseError) {
    if (error.response) {
      res.status(error.code).json({ message: error.message });
    } else {
      // TODO log the error
      console.error(error);
      res.status(error.code).json({ message: 'Internal Server Error' });
    }
  } else {
    // TODO log the error
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

  next();
};

export default ErrorMiddleware;
