import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'test-secret';

function extractBearerToken(req: Request): string | null {
  const raw =
    (req.headers.authorization as string | undefined) ||
    ((req.headers as any).Authorization as string | undefined);
  if (!raw) return null;
  const m = raw.match(/^bearer\s+(.+)$/i);
  return m ? m[1].trim() : null;
}

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
  const token = extractBearerToken(req);
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, SECRET) as any;
    (req as any).user = { id: payload.id };
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export function optionalAuthenticateUser(req: Request, _res: Response, next: NextFunction) {
  const token = extractBearerToken(req);
  if (!token) return next();
  try {
    const payload = jwt.verify(token, SECRET) as any;
    (req as any).user = { id: payload.id };
  } catch {}
  next();
}

export const auth = (token: string) => ({ Authorization: `Bearer ${token}` });
