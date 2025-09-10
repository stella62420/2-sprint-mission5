import { Router } from 'express';
import {
  listMyNotifications,
  getMyUnreadCount,
  markMyNotificationRead,
  createNotification,
} from './notificationController';
import { authenticateUser } from '../middleware/auth';

const notificationRouter = Router();

notificationRouter.get('/me', authenticateUser, listMyNotifications);
notificationRouter.get('/me/unread-count', authenticateUser, getMyUnreadCount);
notificationRouter.patch('/:id/read', authenticateUser, markMyNotificationRead);

notificationRouter.post('/', authenticateUser, createNotification);

export default notificationRouter;
