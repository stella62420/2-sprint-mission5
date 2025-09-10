import type { Request, Response } from 'express';
import { create } from 'superstruct';
import NotificationService from './notificationService';
import { NotificationRepository } from './notificationRepository';
import {
  CreateNotificationBodyStruct,
  UpdateNotificationReadStruct,
} from './notification.structs';
import type { ListNotificationsQueryDTO } from './dtos/notification.request.dto';
import { withAsync } from '../lib/withAsync';

const service = new NotificationService(new NotificationRepository());

export const listMyNotifications = withAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.pageSize ?? 10);
  const result = await service.list(userId, { page, pageSize } as ListNotificationsQueryDTO);
  res.json(result);
});

export const getMyUnreadCount = withAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const count = await service.countUnread(userId);
  res.json({ count });
});

export const markMyNotificationRead = withAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);
  const body = create(req.body ?? { isRead: true }, UpdateNotificationReadStruct);
  if (!body.isRead) return res.status(400).json({ error: 'isRead must be true' });

  const result = await service.markAsRead(id, userId);
  res.json(result);
});

export const createNotification = withAsync(async (req: Request, res: Response) => {
  const dto = create(req.body, CreateNotificationBodyStruct);
  const n = await service.create(dto);
  res.status(201).json(n);
});
