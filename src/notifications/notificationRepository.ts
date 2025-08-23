import { prismaClient } from '../lib/prismaClient';
import type { CreateNotificationRequestDTO } from './dtos/notification.request.dto';

export class NotificationRepository {
  async create(data: CreateNotificationRequestDTO) {
    return prismaClient.notification.create({ data });
  }

  async listByUser(userId: number, page: number, pageSize: number) {
    const where = { userId };
    const [items, total] = await Promise.all([
      prismaClient.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prismaClient.notification.count({ where }),
    ]);
    return { items, total };
  }

  async countUnread(userId: number) {
    return prismaClient.notification.count({ where: { userId, isRead: false } });
  }

  async findById(id: number) {
    return prismaClient.notification.findUnique({ where: { id } });
  }

  async markAsRead(id: number) {
    return prismaClient.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }
}
