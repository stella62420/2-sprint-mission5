import type { Request, Response, NextFunction } from 'express';
import HttpError from '../lib/errors/HttpError';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const isValidation = err?.name === 'StructError' || err?.name === 'ZodError';
  if (isValidation) {
    return res.status(400).json({
      error: 'ValidationError',
      message: err.message,
      issues: err.failures ?? err.issues,
    });
  }

  if (err instanceof HttpError) {
    const body: Record<string, unknown> = {
      error: err.constructor.name,
      message: err.message,
    };
    if (typeof err.payload !== 'undefined') body.payload = err.payload;
    return res.status(err.status).json(body);
  }

  const isDev = process.env.NODE_ENV !== 'production';
  const body: Record<string, unknown> = {
    error: 'InternalServerError',
    message: isDev ? err?.message : 'Internal Server Error',
  };
  if (isDev && err?.stack) body.stack = err.stack;
  return res.status(500).json(body);
}
