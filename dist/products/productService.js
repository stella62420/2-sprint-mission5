"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
class ProductService {
    constructor(repo) {
        this.repo = repo;
    }
    getOwnerId(row) {
        return (row?.authorId ??
            row?.userId ??
            row?.ownerId ??
            row?.author?.id);
    }
    async list(query, userId) {
        if (this.repo?.findMany)
            return this.repo.findMany(query, userId);
        throw new Error('Repository does not implement findMany');
    }
    async getById(id, userId) {
        const found = this.repo?.findById ? await this.repo.findById(id, userId) : null;
        if (!found)
            throw new NotFoundError_1.default(`product ${id} not found`);
        return found;
    }
    async create(dto, userId) {
        if (this.repo?.create)
            return this.repo.create({ ...dto, userId });
        throw new Error('Repository does not implement create');
    }
    async update(id, userId, dto) {
        if (!this.repo?.update)
            throw new Error('Repository does not implement update');
        const found = this.repo?.findById ? await this.repo.findById(id, userId) : null;
        if (!found)
            throw new NotFoundError_1.default(`product ${id} not found`);
        const ownerId = this.getOwnerId(found);
        if (typeof ownerId === 'number' && ownerId !== userId) {
            const err = new Error('forbidden');
            err.status = 403;
            throw err;
        }
        return this.repo.update({ id, userId, dto });
    }
    async remove(id, userId) {
        if (!this.repo?.remove)
            throw new Error('Repository does not implement remove');
        const found = this.repo?.findById ? await this.repo.findById(id, userId) : null;
        if (!found)
            throw new NotFoundError_1.default(`product ${id} not found`);
        const ownerId = this.getOwnerId(found);
        if (typeof ownerId === 'number' && ownerId !== userId) {
            const err = new Error('forbidden');
            err.status = 403;
            throw err;
        }
        await this.repo.remove({ id, userId });
    }
    async like(id, userId) {
        if (this.repo?.addLike)
            await this.repo.addLike({ id, userId });
        else if (this.repo?.like)
            await this.repo.like(id, userId);
        const likes = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
        return { id, likes };
    }
    async unlike(id, userId) {
        if (this.repo?.removeLike)
            await this.repo.removeLike({ id, userId });
        else if (this.repo?.unlike)
            await this.repo.unlike(id, userId);
        const likes = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
        return { id, likes };
    }
    async addLike(id, userId) { return this.like(id, userId); }
    async removeLike(id, userId) { return this.unlike(id, userId); }
}
exports.default = ProductService;
