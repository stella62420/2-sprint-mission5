import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// ---- Routers ----
import articlesRouter from './articles/articleRouter';
import productsRouter from './products/productRouter';
import commentsRouter from './comments/commentRouter';
import imagesRouter from './images/imageRouter';
import authRouter from './auth/authRouter';
import userRouter from './users/userRouter';

import { errorHandler } from '../src/middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/articles', articlesRouter);
app.use('/products', productsRouter);
app.use('/comments', commentsRouter);
app.use('/images', imagesRouter);
app.use('/uploads', express.static(path.resolve('uploads')));

app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

app.use(errorHandler);

export default app;
