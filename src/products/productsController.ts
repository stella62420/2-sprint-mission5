import type { Request, Response, NextFunction } from 'express';
import ProductService from './productService';
import { PrismaProductRepository } from './productRepository';

const service = new ProductService(new PrismaProductRepository());

export async function getProductList(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user?.id as number | undefined;
    const query: any = {
      page: req.query.page ? Number(req.query.page) : 1,
      pageSize: req.query.pageSize ? Number(req.query.pageSize) : 20,
      keyword: req.query.keyword ? String(req.query.keyword) : undefined,
    };
    const data = await service.list(query, userId);
    res.status(200).json(data);
  } catch (e) { next(e); }
}

export async function getProductDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const data = await service.getById(id);
    res.status(200).json(data);
  } catch (e) { next(e); }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user!.id as number;
    const dto = req.body as any;
    const created = await service.create(dto, userId);
    res.status(201).json(created);
  } catch (e) { next(e); }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user!.id as number;
    const dto = req.body as any;
    const updated = await service.update(id, userId, dto);
    res.status(200).json(updated);
  } catch (e) { next(e); }
}

export async function removeProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user!.id as number;
    await service.remove(id, userId);
    res.status(204).end();
  } catch (e) { next(e); }
}

export async function addProductLike(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user!.id as number;
    const result = await service.addLike(id, userId);
    res.status(200).json(result);
  } catch (e) { next(e); }
}

export async function removeProductLike(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user!.id as number;
    const result = await service.removeLike(id, userId);
    res.status(200).json(result);
  } catch (e) { next(e); }
}
