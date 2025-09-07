"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../lib/errors/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../lib/errors/ForbiddenError"));
const notification_gateway_1 = require("./notification.gateway");
class NotificationService {
    constructor(repo) {
        this.repo = repo;
    }
    toDTO(n) {
        return {
            id: n.id,
            message: n.message,
            isRead: n.isRead,
            createdAt: n.createdAt,
        };
    }
    async create(dto) {
        const n = await this.repo.create(dto);
        (0, notification_gateway_1.sendNotification)(dto.userId, dto.message);
        return this.toDTO(n);
    }
    async list(userId, q) {
        const { items, total } = await this.repo.listByUser(userId, q.page, q.pageSize);
        return {
            items: items.map((n) => this.toDTO(n)),
            page: q.page,
            pageSize: q.pageSize,
            total,
        };
    }
    async countUnread(userId) {
        return this.repo.countUnread(userId);
    }
    async markAsRead(id, userId) {
        const n = await this.repo.findById(id);
        if (!n)
            throw new NotFoundError_1.default('Notification not found');
        if (n.userId !== userId)
            throw new ForbiddenError_1.default('Forbidden');
        const updated = await this.repo.markAsRead(id);
        return this.toDTO(updated);
    }
}
exports.default = NotificationService;
