"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, _res, next) => {
    const url = req.originalUrl ?? req.url;
    console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);
    next();
};
exports.default = logger;
