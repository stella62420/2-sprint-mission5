"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class BadRequestError extends HttpError_1.HttpError {
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}
exports.default = BadRequestError;
