import type { Request, Response } from 'express';
import { create } from 'superstruct';
import AuthService from './authService';
import { RegisterBodyStruct, LoginBodyStruct, RefreshBodyStruct } from './auth.structs';

const service = new AuthService();

export async function register(req: Request, res: Response) {
  const dto = create(req.body, RegisterBodyStruct);
  const result = await service.register(dto);
  res.status(201).json(result);
}

export async function login(req: Request, res: Response) {
  const dto = create(req.body, LoginBodyStruct);
  const result = await service.login(dto);
  res.json(result);
}

export async function refresh(req: Request, res: Response) {
  const dto = create(req.body, RefreshBodyStruct);
  const result = await service.refresh(dto);
  res.json(result);
}

export async function logout(req: Request, res: Response) {
  const userId = (req as any).user?.id as number | undefined;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  await service.logout(userId);
  res.status(204).send();
}
