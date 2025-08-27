import type { Request, Response } from 'express';
import { create } from 'superstruct';
import ProductService from './productService';
import { PrismaProductRepository } from './productRepository';
import {
  CreateProductBodyStruct,
  UpdateProductBodyStruct,
  ListProductsQueryStruct,
  IdParamsStruct,
} from './product.struct';

import type {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
  ListProductsQueryDTO,
} from './dtos/product.request.dto';

const service = new ProductService(new PrismaProductRepository());

export async function createProduct(req: Request, res: Response) {
  const dto = create(req.body, CreateProductBodyStruct) as CreateProductRequestDTO;
  const userId = (req as any).user!.id;

  if (req.files && Array.isArray(req.files)) {
    dto.images = (req.files as Express.Multer.File[]).map(f => `/uploads/${f.filename}`);
  }

  res.status(201).json(await service.create(userId, dto));
  }

export async function getProduct(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as { id: number };
  const authId = (req as any).user?.id;
  res.json(await service.getById(id, authId));
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as { id: number };
  const patch = create(req.body ?? {}, UpdateProductBodyStruct) as UpdateProductRequestDTO;
  const userId = (req as any).user!.id;
  res.json(await service.update(id, userId, patch));
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as { id: number };
  const userId = (req as any).user!.id;
  await service.remove(id, userId);
  res.status(204).send();
}

export async function getProductList(req: Request, res: Response) {
  const q = create(req.query, ListProductsQueryStruct) as ListProductsQueryDTO;
  res.json(await service.list(q));
}

export async function addProductLike(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as { id: number };
  const userId = (req as any).user!.id;
  res.json(await service.like(id, userId));
}

export async function removeProductLike(req: Request, res: Response) {
  const { id } = create(req.params, IdParamsStruct) as { id: number };
  const userId = (req as any).user!.id;
  res.json(await service.unlike(id, userId));
}


