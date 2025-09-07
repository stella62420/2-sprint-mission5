"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asHttpError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
const asHttpError = (e, fallback = 500) => {
    if (e?.name === 'StructError') {
        return new HttpError(400, e.message ?? 'Bad Request');
    }
    const pe = e;
    if (pe?.code === 'P2002')
        return new HttpError(409, 'Unique constraint failed');
    if (pe?.code === 'P2025')
        return new HttpError(404, 'Record not found');
    if (e instanceof HttpError)
        return e;
    return new HttpError(fallback, e?.message ?? 'Internal Server Error');
};
exports.asHttpError = asHttpError;
