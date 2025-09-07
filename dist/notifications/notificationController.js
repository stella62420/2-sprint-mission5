"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = exports.markMyNotificationRead = exports.getMyUnreadCount = exports.listMyNotifications = void 0;
const superstruct_1 = require("superstruct");
const notificationService_1 = __importDefault(require("./notificationService"));
const notificationRepository_1 = require("./notificationRepository");
const notification_structs_1 = require("./notification.structs");
const withAsync_1 = require("../lib/withAsync");
const service = new notificationService_1.default(new notificationRepository_1.NotificationRepository());
exports.listMyNotifications = (0, withAsync_1.withAsync)(async (req, res) => {
    const userId = req.user.id;
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 10);
    const result = await service.list(userId, { page, pageSize });
    res.json(result);
});
exports.getMyUnreadCount = (0, withAsync_1.withAsync)(async (req, res) => {
    const userId = req.user.id;
    const count = await service.countUnread(userId);
    res.json({ count });
});
exports.markMyNotificationRead = (0, withAsync_1.withAsync)(async (req, res) => {
    const userId = req.user.id;
    const id = Number(req.params.id);
    const body = (0, superstruct_1.create)(req.body ?? { isRead: true }, notification_structs_1.UpdateNotificationReadStruct);
    if (!body.isRead)
        return res.status(400).json({ error: 'isRead must be true' });
    const result = await service.markAsRead(id, userId);
    res.json(result);
});
exports.createNotification = (0, withAsync_1.withAsync)(async (req, res) => {
    const dto = (0, superstruct_1.create)(req.body, notification_structs_1.CreateNotificationBodyStruct);
    const n = await service.create(dto);
    res.status(201).json(n);
});
