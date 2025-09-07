"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initNotificationGateway = initNotificationGateway;
exports.sendNotification = sendNotification;
const socket_io_1 = require("socket.io");
const jwt_1 = require("../lib/jwt");
let io = null;
function initNotificationGateway(httpServer) {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST'],
        },
    });
    io.use((socket, next) => {
        try {
            const raw = socket.handshake.auth?.token ||
                (socket.handshake.headers.authorization?.startsWith('Bearer ')
                    ? socket.handshake.headers.authorization.split(' ')[1]
                    : undefined);
            if (!raw)
                return next(new Error('Unauthorized: token required'));
            const payload = (0, jwt_1.verifyAccessToken)(raw); // ✅
            socket.data.user = { id: payload.id, email: payload.email, nickname: payload.nickname };
            next();
        }
        catch {
            next(new Error('Unauthorized: invalid token'));
        }
    });
    io.on('connection', (socket) => {
        const user = socket.data.user;
        socket.join(`user-${user.id}`);
        socket.on('subscribe', (room) => {
            if (room?.startsWith('user-'))
                return;
            socket.join(room);
        });
        socket.on('disconnect', () => { });
    });
    return io;
}
function sendNotification(userId, message) {
    if (!io)
        return;
    io.to(`user-${userId}`).emit('notification', { message, ts: new Date().toISOString() });
}
