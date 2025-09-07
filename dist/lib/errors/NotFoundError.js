"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class NotFoundError extends HttpError_1.HttpError {
    constructor(message = 'Not Found') {
        super(404, message);
    }
}
exports.default = NotFoundError;
