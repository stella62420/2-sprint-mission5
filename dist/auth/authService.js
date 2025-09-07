"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UnauthorizedError_1 = __importDefault(require("../lib/errors/UnauthorizedError"));
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const JWT_EXPIRES_IN = '1h';
function signToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
async function signup(dto) {
    const exists = await prismaClient_1.default.user.findFirst({
        where: { OR: [{ email: dto.email }, { nickname: dto.nickname }] },
        select: { id: true },
    });
    if (exists)
        throw new UnauthorizedError_1.default('Already exists');
    const hashed = await bcryptjs_1.default.hash(dto.password, 10);
    const user = await prismaClient_1.default.user.create({
        data: {
            email: dto.email,
            password: hashed,
            nickname: dto.nickname,
            image: dto.image ?? null,
        },
        select: { id: true, email: true, nickname: true, createdAt: true },
    });
    return user;
}
async function login(dto) {
    const user = await prismaClient_1.default.user.findUnique({
        where: { email: dto.email },
        select: { id: true, password: true, nickname: true },
    });
    if (!user) {
        throw new UnauthorizedError_1.default('Invalid email or password');
    }
    const ok = await bcryptjs_1.default.compare(dto.password, user.password);
    if (!ok) {
        throw new UnauthorizedError_1.default('Invalid email or password');
    }
    const token = signToken({ id: user.id, nickname: user.nickname });
    return { token };
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
