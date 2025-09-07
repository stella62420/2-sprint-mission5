"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
class ArticleService {
    constructor(repo) {
        this.repo = repo;
    }
    async list(query, userId) {
        return await this.repo.findMany(query, userId);
    }
    async detail(id, userId) {
        const row = await this.repo.findById(id, userId);
        if (!row)
            throw new NotFoundError_1.default('Article not found');
        return row;
    }
    async create(userId, dto) {
        return await this.repo.create(userId, dto);
    }
    async update(id, userId, dto) {
        return await this.repo.update(id, userId, dto);
    }
    async remove(id, userId) {
        await this.repo.delete(id, userId);
    }
    async like(id, userId) {
        if (this.repo?.like)
            await this.repo.like(id, userId);
        const likes = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
        return { id, likes };
    }
    async unlike(id, userId) {
        if (this.repo?.unlike)
            await this.repo.unlike(id, userId);
        const likes = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
        return { id, likes };
    }
}
exports.default = ArticleService;
