class BaseError extends Error {
  code: number;
  innerError?: Error;
  response: boolean;

  constructor(message: string, code: number, innerError?: Error, response = true) {
    super(message);
    this.code = code;
    this.innerError = innerError;
    this.response = response;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class AsyncError extends BaseError {
  constructor(message = 'Internal Server Error', code = 500, innerError?: Error) {
    super(message, code, innerError, false);
  }
}

class ResourceNotFoundError extends BaseError {
  constructor(message = 'Resource not found', code = 404, innerError?: Error) {
    super(message, code, innerError);
  }
}

class ConflictError extends BaseError {
  constructor(message = 'Conflict', code = 409, innerError?: Error) {
    super(message, code, innerError);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized', code = 401, innerError?: Error) {
    super(message, code, innerError);
  }
}

class BadRequestError extends BaseError {
  constructor(message = 'Bad Request', code = 400, innerError?: Error) {
    super(message, code, innerError);
  }
}

export { BaseError, AsyncError, ResourceNotFoundError, ConflictError, UnauthorizedError, BadRequestError };
