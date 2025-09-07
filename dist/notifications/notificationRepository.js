"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
class NotificationRepository {
    async create(data) {
        return prismaClient_1.default.notification.create({ data });
    }
    async listByUser(userId, page, pageSize) {
        const where = { userId };
        const [items, total] = await Promise.all([
            prismaClient_1.default.notification.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prismaClient_1.default.notification.count({ where }),
        ]);
        return { items, total };
    }
    async countUnread(userId) {
        return prismaClient_1.default.notification.count({ where: { userId, isRead: false } });
    }
    async findById(id) {
        return prismaClient_1.default.notification.findUnique({ where: { id } });
    }
    async markAsRead(id) {
        return prismaClient_1.default.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
}
exports.NotificationRepository = NotificationRepository;
