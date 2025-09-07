"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const status = (typeof err?.status === 'number' && err.status) ||
        (typeof err?.statusCode === 'number' && err.statusCode) ||
        (typeof err?.code === 'number' && err.code) ||
        500;
    const message = (typeof err?.message === 'string' && err.message) ||
        (status === 401 ? 'Unauthorized' :
            status === 400 ? 'Bad Request' : 'Internal Server Error');
    if (process.env.NODE_ENV !== 'production') {
        console.error('[errorHandler]', { status, message, err });
    }
    res.status(status).json({ message });
}
