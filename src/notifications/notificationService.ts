import { NotificationRepository } from './notificationRepository';
import type {
  CreateNotificationRequestDTO,
  ListNotificationsQueryDTO,
} from './dtos/notification.request.dto';
import type { NotificationResponseDTO, Paginated } from './dtos/notification.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';
import ForbiddenError from '../lib/errors/ForbiddenError';
import { sendNotification } from './notification.gateway';

export default class NotificationService {
  constructor(private repo: NotificationRepository) {}

  private toDTO(n: any): NotificationResponseDTO {
    return {
      id: n.id,
      message: n.message,
      isRead: n.isRead,
      createdAt: n.createdAt,
    };
  }

  async create(dto: CreateNotificationRequestDTO): Promise<NotificationResponseDTO> {
    const n = await this.repo.create(dto);
    sendNotification(dto.userId, dto.message);
    return this.toDTO(n);
  }

  async list(userId: number, q: ListNotificationsQueryDTO): Promise<Paginated<NotificationResponseDTO>> {
    const { items, total } = await this.repo.listByUser(userId, q.page, q.pageSize);
    return {
      items: items.map((n) => this.toDTO(n)),
      page: q.page,
      pageSize: q.pageSize,
      total,
    };
  }

  async countUnread(userId: number): Promise<number> {
    return this.repo.countUnread(userId);
  }

  async markAsRead(id: number, userId: number): Promise<NotificationResponseDTO> {
    const n = await this.repo.findById(id);
    if (!n) throw new NotFoundError('Notification not found');
    if (n.userId !== userId) throw new ForbiddenError('Forbidden');

    const updated = await this.repo.markAsRead(id);
    return this.toDTO(updated);
  }
}
