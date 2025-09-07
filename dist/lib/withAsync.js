"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAsync = void 0;
const withAsync = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.withAsync = withAsync;
