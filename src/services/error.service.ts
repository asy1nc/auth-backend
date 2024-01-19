class BaseError extends Error {
    code: number;
    innerError?: Error;

    constructor(message: string, code: number, innerError?: Error) {
        super(message);
        this.code = code;
        this.innerError = innerError;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class AsyncError extends BaseError {
    constructor(message = "Internal Server Error", code = 500, innerError?: Error) {
        super(message, code, innerError);
    }
}

class ResourceNotFoundError extends BaseError {
    constructor(message = "Resource not found", code = 404, innerError?: Error) {
        super(message, code, innerError);
    }
}

class ConflictError extends BaseError {
    constructor(message = "Conflict", code = 409, innerError?: Error) {
        super(message, code, innerError);
    }
}

class UnauthorizedError extends BaseError {
    constructor(message = "Unauthorized", code = 401, innerError?: Error) {
        super(message, code, innerError);
    }
}

class BadRequestError extends BaseError {
    constructor(message = "Bad Request", code = 400, innerError?: Error) {
        super(message, code, innerError);
    }
}

export {
    AsyncError,
    ResourceNotFoundError,
    ConflictError,
    UnauthorizedError,
    BadRequestError
}