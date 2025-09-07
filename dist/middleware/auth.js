"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
exports.authenticateUser = authenticateUser;
exports.optionalAuthenticateUser = optionalAuthenticateUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'test-secret';
function extractBearerToken(req) {
    const raw = req.headers.authorization ||
        req.headers.Authorization;
    if (!raw)
        return null;
    const m = raw.match(/^bearer\s+(.+)$/i);
    return m ? m[1].trim() : null;
}
function authenticateUser(req, res, next) {
    const token = extractBearerToken(req);
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const payload = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = { id: payload.id };
        next();
    }
    catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
function optionalAuthenticateUser(req, _res, next) {
    const token = extractBearerToken(req);
    if (!token)
        return next();
    try {
        const payload = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = { id: payload.id };
    }
    catch { }
    next();
}
const auth = (token) => ({ Authorization: `Bearer ${token}` });
exports.auth = auth;
