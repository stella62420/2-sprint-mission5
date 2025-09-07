"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaArticleRepository = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
class PrismaArticleRepository {
    async list(page = 1, pageSize = 20) {
        const skip = (page - 1) * pageSize;
        return prismaClient_1.default.article.findMany({
            skip,
            take: pageSize,
            orderBy: { id: 'desc' },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, nickname: true } },
            },
        });
    }
    async findById(id) {
        return prismaClient_1.default.article.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, nickname: true } },
            },
        });
    }
    async create(userId, data) {
        const { title, content, image } = data;
        return prismaClient_1.default.article.create({
            data: {
                title,
                content,
                image: image ?? null,
                authorId: userId,
            },
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, nickname: true } },
            },
        });
    }
    async update(id, data) {
        return prismaClient_1.default.article.update({
            where: { id },
            data,
            select: {
                id: true,
                title: true,
                content: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                author: { select: { id: true, nickname: true } },
            },
        });
    }
    async remove(id) {
        await prismaClient_1.default.article.delete({ where: { id } });
    }
}
exports.PrismaArticleRepository = PrismaArticleRepository;
exports.default = PrismaArticleRepository;
