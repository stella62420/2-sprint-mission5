"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = require("./HttpError");
class ForbiddenError extends HttpError_1.HttpError {
    constructor(message = 'Forbidden') {
        super(403, message);
    }
}
exports.default = ForbiddenError;
