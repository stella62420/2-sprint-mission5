import type { Request, Response } from 'express';
import { create } from 'superstruct';
import ArticleService from './articleService';
import { PrismaArticleRepository } from './articleRepository';
import {
  CreateArticleBodyStruct,
  UpdateArticleBodyStruct,
  ListArticlesQueryStruct,
  IdParamsStruct,
} from './article.structs';
import type { CreateArticleRequestDTO } from './dtos/article.request.dto';

const service = new ArticleService(new PrismaArticleRepository());

export async function createArticle(req: Request, res: Response) {
  const dto = create(req.body, CreateArticleBodyStruct) as CreateArticleRequestDTO;
  const userId = (req as any).user!.id;

  if (req.file) {
    dto.image = `/uploads/${req.file.filename}`;
  }

  res.status(201).json(await service.create(userId, dto));
}

export async function getArticle(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const authId = (req as any).user?.id;
  res.json(await service.getById(id, authId));
}

export async function updateArticle(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const patch = create(req.body ?? {}, UpdateArticleBodyStruct);
  const userId = (req as any).user!.id;
  res.json(await service.update(id, userId, patch));
}

export async function deleteArticle(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const userId = (req as any).user!.id;
  await service.remove(id, userId);
  res.status(204).send();
}

export async function getArticleList(req: Request, res: Response) {
  const q = create(req.query, ListArticlesQueryStruct);
  res.json(await service.list(q));
}

export async function addArticleLike(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const userId = (req as any).user!.id;
  res.json(await service.like(id, userId));
}

export async function removeArticleLike(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const userId = (req as any).user!.id;
  res.json(await service.unlike(id, userId));
}
