import type { Request, Response, NextFunction, RequestHandler } from 'express';

const logger: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
  const url = (req as any).originalUrl ?? req.url;
  console.log(`[${new Date().toISOString()}] ${req.method} ${url}`);
  next();
};

export default logger;

