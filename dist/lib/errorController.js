"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.defaultNotFoundHandler = defaultNotFoundHandler;
function errorHandler(err, req, res, _next) {
    const status = err.status || err.code || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
}
function defaultNotFoundHandler(req, res) {
    res.status(404).json({ message: 'Not Found' });
}
