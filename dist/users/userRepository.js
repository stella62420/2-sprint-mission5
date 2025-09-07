"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
class UserRepository {
    async create(data) {
        return prismaClient_1.default.user.create({ data });
    }
    async findById(id) {
        return prismaClient_1.default.user.findUnique({ where: { id } });
    }
    async findByEmail(email) {
        return prismaClient_1.default.user.findUnique({ where: { email } });
    }
    async update(id, patch) {
        return prismaClient_1.default.user.update({ where: { id }, data: patch });
    }
    async delete(id) {
        await prismaClient_1.default.user.delete({ where: { id } });
    }
}
exports.UserRepository = UserRepository;
