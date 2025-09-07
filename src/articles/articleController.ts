import type { Request, Response, NextFunction } from 'express';
import PrismaArticleRepository from './articleRepository';
import ArticleService from './articleService';
import NotFoundError from '../lib/errors/NotFoundError';

const repo = new PrismaArticleRepository();
const service = new ArticleService(repo);

export async function getArticleList(req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 20;
    const items = await repo.list(page, pageSize);
    res.status(200).json(items);
  } catch (e) { next(e); }
}

export async function getArticleDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const one = await repo.findById(id);
    if (!one) throw new NotFoundError(`article ${id} not found`);
    res.status(200).json(one);
  } catch (e) { next(e); }
}

export async function createArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user!.id as number;
    const { title, content, image } = req.body ?? {};
    if (!title || !content || typeof title !== 'string' || typeof content !== 'string') {
      res.status(400).json({ message: 'title and content are required' });
      return;
    }
    const created = await repo.create(userId, { title, content, image });
    res.status(201).json(created);
  } catch (e) { next(e); }
}

export async function updateArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user!.id as number;
    const { title, content, image } = req.body ?? {};
    if (typeof title === 'undefined' && typeof content === 'undefined' && typeof image === 'undefined') {
      res.status(400).json({ message: 'no fields' });
      return;
    }

    const current = await repo.findById(id);
    if (!current) throw new NotFoundError(`article ${id} not found`);

    if (current.author?.id !== userId) {
      res.status(403).json({ message: 'forbidden' });
      return;
    }

    const updated = await repo.update(id, { title, content, image });
    res.status(200).json(updated);
  } catch (e) { next(e); }
}

export async function removeArticle(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user!.id as number;

    const current = await repo.findById(id);
    if (!current) throw new NotFoundError(`article ${id} not found`);

    if (current.author?.id !== userId) {
      res.status(403).json({ message: 'forbidden' });
      return;
    }
    await repo.remove(id);
    res.status(204).end();
  } catch (e) { next(e); }
}
