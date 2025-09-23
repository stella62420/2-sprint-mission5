import { Server, Socket } from 'socket.io';
import { verifyAccessToken, AccessPayload } from '../lib/jwt';

let io: Server | null = null;

export function initNotificationGateway(httpServer: any) {
  io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
  try {
    const raw =
      socket.handshake.auth?.token ||
      (socket.handshake.headers.authorization?.startsWith('Bearer ')
        ? socket.handshake.headers.authorization.split(' ')[1]
        : undefined);

    if (!raw) return next(new Error('Unauthorized: token required'));

    const payload = verifyAccessToken(raw) as AccessPayload;  // ✅
    socket.data.user = { id: payload.id, email: payload.email, nickname: payload.nickname };
    next();
  } catch {
    next(new Error('Unauthorized: invalid token'));
  }
});

  io.on('connection', (socket) => {
    const user = socket.data.user as { id: number; email: string; nickname: string };
    socket.join(`user-${user.id}`);

    socket.on('subscribe', (room: string) => {
      if (room?.startsWith('user-')) return;
      socket.join(room);
    });

    socket.on('disconnect', () => {});
  });

  return io;
}

export function sendNotification(userId: number, message: string) {
  if (!io) return;
  io.to(`user-${userId}`).emit('notification', { message, ts: new Date().toISOString() });
}
