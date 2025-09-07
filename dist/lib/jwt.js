"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.decodeToken = decodeToken;
exports.sanitizeUser = sanitizeUser;
exports.verifyJwt = verifyJwt;
exports.signJwt = signJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET;
const ACCESS_EXPIRES_IN = (process.env.ACCESS_EXPIRES_IN || '15m');
const REFRESH_EXPIRES_IN = (process.env.REFRESH_EXPIRES_IN || '7d');
function signAccessToken(payload, opts = {}) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN, ...opts });
}
function signRefreshToken(payload, opts = {}) {
    return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN, ...opts });
}
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
}
function decodeToken(token) {
    return jsonwebtoken_1.default.decode(token);
}
function sanitizeUser(user) {
    if (!user)
        return user;
    const { password, ...safe } = user;
    return safe;
}
function verifyJwt(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
function signJwt(payload, expiresIn = '7d') {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
