import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || JWT_SECRET;
const ACCESS_EXPIRES_IN = (process.env.ACCESS_EXPIRES_IN || '15m') as SignOptions['expiresIn'];
const REFRESH_EXPIRES_IN = (process.env.REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

export interface AccessPayload {
  id: number;
  email: string;
  nickname: string;
}

export interface RefreshPayload {
  id: number;
  tokenVersion?: number;
}

export function signAccessToken(payload: AccessPayload, opts: SignOptions = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES_IN, ...opts });
}

export function signRefreshToken(payload: RefreshPayload, opts: SignOptions = {}) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN, ...opts });
}

export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, JWT_SECRET) as AccessPayload;
}

export function verifyRefreshToken(token: string): RefreshPayload {
  return jwt.verify(token, JWT_REFRESH_SECRET) as RefreshPayload;
}

export function decodeToken<T = unknown>(token: string) {
  return jwt.decode(token) as T | null;
}

export function sanitizeUser<T extends { password?: string | null }>(user: T): Omit<T, 'password'> {
  if (!user) return user as any;
  const { password, ...safe } = user as any;
  return safe;
}
