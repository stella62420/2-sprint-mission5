import type { RequestHandler } from 'express';
import { prismaClient } from '../lib/prismaClient';
import { verifyAccessToken } from '../lib/jwt';

export const authenticateUser: RequestHandler = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token missing or malformed.' });
    }
    const token = header.split(' ')[1];
    const { id } = verifyAccessToken(token);

    const user = await prismaClient.user.findUnique({
      where: { id },
      select: { id: true, email: true, nickname: true, image: true, createdAt: true },
    });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    (req as any).user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const optionalAuthenticateUser: RequestHandler = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      (req as any).user = null; return next();
    }
    const token = header.split(' ')[1];
    const { id } = verifyAccessToken(token);
    const user = await prismaClient.user.findUnique({
      where: { id },
      select: { id: true, email: true, nickname: true, image: true, createdAt: true },
    });
    (req as any).user = user || null;
    next();
  } catch {
    (req as any).user = null; next();
  }
};
