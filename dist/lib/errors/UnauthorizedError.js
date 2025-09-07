"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class UnauthorizedError extends HttpError_1.HttpError {
    constructor(message = 'Unauthorized') {
        super(401, message);
    }
}
exports.default = UnauthorizedError;
