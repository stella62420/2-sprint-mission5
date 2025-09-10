import prisma from '../lib/prismaClient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UnauthorizedError from '../lib/errors/UnauthorizedError';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret';
const JWT_EXPIRES_IN = '1h';

export interface SignupDTO {
  email: string;
  password: string;
  nickname: string;
  image?: string | null;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
}

function signToken(payload: { id: number; nickname?: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function signup(dto: SignupDTO) {
  const exists = await prisma.user.findFirst({
    where: { OR: [{ email: dto.email }, { nickname: dto.nickname }] },
    select: { id: true },
  });
  if (exists) throw new UnauthorizedError('Already exists');

  const hashed = await bcrypt.hash(dto.password, 10);

  const user = await prisma.user.create({
    data: {
      email: dto.email,
      password: hashed,
      nickname: dto.nickname,
      image: dto.image ?? null,
    },
    select: { id: true, email: true, nickname: true, createdAt: true },
  });

  return user;
}

export async function login(dto: LoginDTO): Promise<LoginResult> {
  const user = await prisma.user.findUnique({
    where: { email: dto.email },
    select: { id: true, password: true, nickname: true },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const ok = await bcrypt.compare(dto.password, user.password);
  if (!ok) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = signToken({ id: user.id, nickname: user.nickname });
  return { token };
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { id: number; nickname?: string; iat: number; exp: number };
}
