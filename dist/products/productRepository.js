"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProductRepository = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
class PrismaProductRepository {
    async create(data) {
        const row = await prismaClient_1.default.product.create({
            data: {
                userId: data.userId,
                title: data.title,
                description: data.description ?? null,
                price: data.price,
                category: data.category ?? null,
                images: data.images ?? [],
            },
        });
        return {
            id: row.id,
            title: row.title,
            description: row.description ?? null,
            price: row.price,
            images: row.images,
            category: row.category ?? null,
            createdAt: row.createdAt,
        };
    }
    async findById(id) {
        const row = await prismaClient_1.default.product.findUnique({
            where: { id },
            include: { _count: { select: { Likes: true } } },
        });
        if (!row)
            return null;
        return {
            id: row.id,
            title: row.title,
            description: row.description ?? null,
            price: row.price,
            images: row.images,
            category: row.category ?? null,
            createdAt: row.createdAt,
            likes: row._count.Likes,
        };
    }
    async findMany(q, _userId) {
        const page = q.page ?? 1;
        const pageSize = q.pageSize ?? 10;
        const skip = (page - 1) * pageSize;
        const where = {};
        if (q.q)
            where.title = { contains: q.q };
        const orderBy = q.orderBy === 'priceAsc'
            ? { price: 'asc' }
            : q.orderBy === 'priceDesc'
                ? { price: 'desc' }
                : { createdAt: 'desc' };
        const [rows, total] = await Promise.all([
            prismaClient_1.default.product.findMany({
                where,
                orderBy,
                skip,
                take: pageSize,
                include: { _count: { select: { Likes: true } } },
            }),
            prismaClient_1.default.product.count({ where }),
        ]);
        const items = rows.map((r) => ({
            id: r.id,
            title: r.title,
            price: r.price,
            images: r.images,
            category: r.category ?? null,
            createdAt: r.createdAt,
            likes: r._count.Likes,
        }));
        return { items, total };
    }
    async update(args) {
        const { id, userId, dto } = args;
        const { count } = await prismaClient_1.default.product.updateMany({
            where: { id, userId },
            data: {
                ...(dto.title !== undefined ? { title: dto.title } : {}),
                ...(dto.description !== undefined
                    ? { description: dto.description ?? null }
                    : {}),
                ...(dto.price !== undefined ? { price: dto.price } : {}),
                ...(dto.category !== undefined ? { category: dto.category ?? null } : {}),
                ...(dto.images !== undefined ? { images: dto.images ?? [] } : {}),
            },
        });
        if (count === 0) {
            const err = new Error('forbidden');
            err.status = 403;
            throw err;
        }
        const row = await prismaClient_1.default.product.findUnique({
            where: { id },
            include: { _count: { select: { Likes: true } } },
        });
        return {
            id: row.id,
            title: row.title,
            description: row.description ?? null,
            price: row.price,
            images: row.images,
            category: row.category ?? null,
            createdAt: row.createdAt,
            likes: row._count.Likes,
        };
    }
    async remove(args) {
        const { id, userId } = args;
        const { count } = await prismaClient_1.default.product.deleteMany({
            where: { id, userId },
        });
        if (count === 0) {
            const err = new Error('forbidden');
            err.status = 403;
            throw err;
        }
    }
    async addLike({ id, userId }) {
        await prismaClient_1.default.productLike.upsert({
            where: { productId_userId: { productId: id, userId } },
            create: { productId: id, userId },
            update: {},
        });
    }
    async removeLike({ id, userId }) {
        await prismaClient_1.default.productLike.deleteMany({
            where: { productId: id, userId },
        });
    }
    async countLikes(id) {
        return prismaClient_1.default.productLike.count({ where: { productId: id } });
    }
}
exports.PrismaProductRepository = PrismaProductRepository;
