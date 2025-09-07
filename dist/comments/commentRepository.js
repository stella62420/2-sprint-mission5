"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCommentRepository = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
class PrismaCommentRepository {
    async findById(id) {
        return prismaClient_1.default.comment.findUnique({ where: { id } });
    }
    async list({ page, pageSize, targetType, targetId, userId }) {
        const where = {};
        if (typeof userId === 'number')
            where.userId = userId;
        if (targetType && typeof targetId === 'number') {
            if (targetType === 'product')
                where.productId = targetId;
            else
                where.articleId = targetId;
        }
        else if (typeof targetId === 'number' && !targetType) {
            where.OR = [{ productId: targetId }, { articleId: targetId }];
        }
        const [items, total] = await Promise.all([
            prismaClient_1.default.comment.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prismaClient_1.default.comment.count({ where }),
        ]);
        return { items, total };
    }
    async create(data) {
        const payload = data.targetType === 'product'
            ? { content: data.content, userId: data.userId, productId: data.targetId }
            : { content: data.content, userId: data.userId, articleId: data.targetId };
        return prismaClient_1.default.comment.create({ data: payload });
    }
    async update(id, patch) {
        return prismaClient_1.default.comment.update({ where: { id }, data: patch });
    }
    async delete(id) {
        await prismaClient_1.default.comment.delete({ where: { id } });
    }
    async targetExists(type, id) {
        if (type === 'product') {
            const x = await prismaClient_1.default.product.findUnique({ where: { id }, select: { id: true } });
            return !!x;
        }
        const y = await prismaClient_1.default.article.findUnique({ where: { id }, select: { id: true } });
        return !!y;
    }
    async findArticleAuthor(articleId) {
        return prismaClient_1.default.article.findUnique({
            where: { id: articleId },
            select: { id: true, title: true, authorId: true },
        });
    }
    async findProductSeller(productId) {
        return prismaClient_1.default.product.findUnique({
            where: { id: productId },
            select: { id: true, title: true, userId: true },
        });
    }
}
exports.PrismaCommentRepository = PrismaCommentRepository;
