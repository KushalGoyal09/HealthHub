"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwInternalServerError = exports.throwForbiddenError = exports.throwUnauthorizedError = exports.throwNotFoundError = exports.throwBadRequestError = exports.throwCustomError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, description, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.discription = description;
    }
}
exports.CustomError = CustomError;
const throwCustomError = (message, description, statusCode) => {
    throw new CustomError(message, description, statusCode);
};
exports.throwCustomError = throwCustomError;
const throwBadRequestError = (message) => {
    throw new CustomError(message, "Bad Request", 400);
};
exports.throwBadRequestError = throwBadRequestError;
const throwNotFoundError = (message) => {
    throw new CustomError(message, "Not Found", 404);
};
exports.throwNotFoundError = throwNotFoundError;
const throwUnauthorizedError = (message) => {
    throw new CustomError(message, "Unauthorized", 401);
};
exports.throwUnauthorizedError = throwUnauthorizedError;
const throwForbiddenError = (message) => {
    throw new CustomError(message, "Forbidden", 403);
};
exports.throwForbiddenError = throwForbiddenError;
const throwInternalServerError = (message) => {
    throw new CustomError((message || "somthing went wrong"), "Internal Server Error", 500);
};
exports.throwInternalServerError = throwInternalServerError;
