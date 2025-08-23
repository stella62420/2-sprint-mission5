import bcrypt from 'bcryptjs';
import { prismaClient } from '../lib/prismaClient';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  sanitizeUser,
} from '../lib/jwt';
import HttpError from '../lib/errors/HttpError';
import NotFoundError from '../lib/errors/NotFoundError';
import UnauthorizedError from '../lib/errors/UnauthorizedError';

import type {
  RegisterRequestDTO,
  LoginRequestDTO,
  RefreshRequestDTO,
} from './dtos/auth.request.dto';

import type {
  RegisterResponseDTO,
  LoginResponseDTO,
  RefreshResponseDTO,
  AuthUserDTO,
} from './dtos/auth.response.dto';

export default class AuthService {
  private toAuthUserDTO(u: any): AuthUserDTO {
    return sanitizeUser(u) as AuthUserDTO;
  }

  async register(dto: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const dup = await prismaClient.user.findUnique({ where: { email: dto.email } });
    if (dup) throw new HttpError(409, 'Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await prismaClient.user.create({
      data: { email: dto.email, password: hashed, nickname: dto.nickname },
      select: { id: true, email: true, nickname: true, image: true, createdAt: true, password: true },
    });

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });
    const refreshToken = signRefreshToken({ id: user.id });

    await prismaClient.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { user: this.toAuthUserDTO(user), accessToken, refreshToken };
  }

  async login(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await prismaClient.user.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, nickname: true, image: true, createdAt: true, password: true },
    });
    if (!user) throw new UnauthorizedError('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedError('Invalid credentials');

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });
    const refreshToken = signRefreshToken({ id: user.id });

    await prismaClient.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { user: this.toAuthUserDTO(user), accessToken, refreshToken };
  }

  async refresh(dto: RefreshRequestDTO): Promise<RefreshResponseDTO> {
    let payload: { id: number };
    try {
      payload = verifyRefreshToken(dto.refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await prismaClient.user.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        email: true,
        nickname: true,
        image: true,
        createdAt: true,
        refreshToken: true,
      },
    });
    if (!user) throw new NotFoundError('User not found');

    if (user.refreshToken !== dto.refreshToken) {
      throw new UnauthorizedError('Refresh token mismatch');
    }

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    });
    const newRefreshToken = signRefreshToken({ id: user.id });

    await prismaClient.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return { user: this.toAuthUserDTO(user), accessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: number): Promise<void> {
    const exists = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!exists) throw new NotFoundError('User not found');

    await prismaClient.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }
}
