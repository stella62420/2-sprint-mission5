"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
class UserService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const user = await this.repo.create(dto);
        return this.toDTO(user);
    }
    async getById(id) {
        const user = await this.repo.findById(id);
        if (!user)
            throw new NotFoundError_1.default('User not found');
        return this.toDTO(user);
    }
    async update(id, patch) {
        const user = await this.repo.update(id, patch);
        return this.toDTO(user);
    }
    async remove(id) {
        await this.repo.delete(id);
    }
    toDTO(user) {
        return {
            id: user.id,
            email: user.email,
            nickname: user.nickname,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
exports.default = UserService;
