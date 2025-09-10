import type { Request, Response, NextFunction } from 'express';
import { create } from 'superstruct';
import { RegisterBodyStruct, LoginBodyStruct } from './auth.structs';
import * as service from './authService';

function pickId(obj: any) {
  return obj?.id ?? obj?.data?.id ?? obj?.user?.id;
}
function pickToken(obj: any) {
  return obj?.token ?? obj?.accessToken ?? obj?.data?.token;
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const body = create(req.body ?? {}, RegisterBodyStruct);
    const fn: any =
      (service as any).signup ??
      (service as any).register ??
      (service as any).signUp;
    if (typeof fn !== 'function') throw new Error('authService.signup not implemented');

    const created = await fn(body);
    res.status(201).json({ id: pickId(created) });
  } catch (e: any) {
    if (e?.name === 'StructError') {
      return res.status(400).json({ message: e.message ?? 'Bad Request' });
    }
    const status = typeof e?.status === 'number' ? e.status : 0;
    if (status === 400) return res.status(400).json({ message: e.message ?? 'Bad Request' });
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const body = create(req.body ?? {}, LoginBodyStruct);
    const fn: any =
      (service as any).login ??
      (service as any).signin ??
      (service as any).signIn ??
      (service as any).logIn;
    if (typeof fn !== 'function') throw new Error('authService.login not implemented');

    const result = await fn(body);
    res.status(200).json({ token: pickToken(result) });
  } catch (e: any) {
    if (e?.name === 'StructError') {
      return res.status(400).json({ message: e.message ?? 'Bad Request' });
    }
    const status = typeof e?.status === 'number' ? e.status : 0;
    if (status === 401) return res.status(401).json({ message: 'Unauthorized' });
    if (status === 400) return res.status(400).json({ message: e.message ?? 'Bad Request' });
    next(e);
  }
}

export default { signup, login };
