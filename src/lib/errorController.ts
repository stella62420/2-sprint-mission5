import { Request, Response, NextFunction } from 'express';
import BadRequestError from './errors/BadRequestError';
import NotFoundError from './errors/NotFoundError';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  const status = err.status || err.code || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
}

export function defaultNotFoundHandler(req: Request, res: Response) {
  res.status(404).json({ message: 'Not Found' });
}

