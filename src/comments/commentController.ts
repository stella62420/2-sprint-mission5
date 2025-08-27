import type { Request, Response } from 'express';
import { create } from 'superstruct';
import CommentService from './commentService';
import { PrismaCommentRepository } from './commentRepository';
import {
  CreateCommentBodyStruct,
  UpdateCommentBodyStruct,
  ListCommentsQueryStruct,
  IdParamsStruct,
} from './comment.struct';

const service = new CommentService(new PrismaCommentRepository());

function inferTargetFromPath(req: Request): { targetType?: 'product'|'article'; targetId?: number } {
  const path = req.baseUrl + req.path;
  const m1 = path.match(/\/products\/(\d+)\/comments/);
  if (m1) return { targetType: 'product', targetId: Number(m1[1]) };
  const m2 = path.match(/\/articles\/(\d+)\/comments/);
  if (m2) return { targetType: 'article', targetId: Number(m2[1]) };
  return {};
}

export async function getComment(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  res.json(await service.get(id));
}

export async function getCommentList(req: Request, res: Response) {
  const q = create(req.query, ListCommentsQueryStruct);
  res.json(await service.list(q));
}

export async function createComment(req: Request, res: Response) {
  const body = create(req.body, CreateCommentBodyStruct) as any;
  const userId = (req as any).user!.id;

  const inferred = inferTargetFromPath(req);
  const targetType = body.targetType ?? inferred.targetType;
  const targetId   = body.targetId   ?? inferred.targetId;

  if (!targetType || typeof targetId !== 'number') {
    return res.status(400).json({ message: 'targetType and targetId are required' });
  }

  const dto = { content: body.content, targetType, targetId };
  const result = await service.create(userId, dto);
  res.status(201).json(result);
}

export async function updateComment(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const patch = create(req.body, UpdateCommentBodyStruct);
  const userId = (req as any).user!.id;
  res.json(await service.update(id, userId, patch));
}

export async function deleteComment(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as any;
  const userId = (req as any).user!.id;
  await service.remove(id, userId);
  res.status(204).send();
}
