// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import cors from 'cors';

import Logger from './lib/utils/logger';

// ---- Routers ----
import articlesRouter from './articles/articleRouter';
import productsRouter from './products/productRouter';
import commentsRouter from './comments/commentRouter';
import documentsRouter from './images/imageRouter';
import authRouter from './auth/authRouter';
import userRouter from './users/userRouter';

const app = express();

// ---- Paths ----
const PUBLIC_PATH = path.resolve(process.cwd(), 'public');
const UPLOADS_PATH = path.resolve(process.cwd(), 'uploads');

// ---- Middlewares ----
app.use(Logger);
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(PUBLIC_PATH));
app.use('/uploads', express.static(UPLOADS_PATH));

// ---- Routes ----
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/articles', articlesRouter);
app.use('/products', productsRouter);
app.use('/articles/:articleId/comments', commentsRouter);
app.use('/products/:productId/comments', commentsRouter);
app.use('/documents', documentsRouter);

app.use((req: Request, _res: Response, next: NextFunction) => {
  next(createError(404));
});

// ---- Error Handler ----
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  res.locals.message = err?.message ?? 'Unknown error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const status: number = typeof err?.status === 'number'
    ? err.status
    : Number(err?.status) || 500;

  res.status(status).send('ERROR: ' + (err?.message ?? 'Unknown error'));
});

export default app;
