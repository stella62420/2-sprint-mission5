import type { Request, Response } from 'express';
import { withAsync } from '../lib/withAsync';
import ProductService from './productService';
import { PrismaProductRepository } from './productRepository';
import {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
  ListProductsQueryDTO,
} from './dtos/product.request.dto';

const repo = new PrismaProductRepository();
const service = new ProductService(repo);

/**
 * POST /products
 * 상품 생성
 */
export const createProduct = withAsync(async (req: Request, res: Response) => {
  const dto = req.body as CreateProductRequestDTO;
  const userId = (req as any).user.id;
  const product = await service.create(userId, dto);
  res.status(201).json(product);
});

/**
 * GET /products/:id
 * 특정 상품 상세 조회
 */
export const getProduct = withAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userId = (req as any).user?.id;
  const product = await service.getById(id, userId);
  res.json(product);
});

/**
 * PATCH /products/:id
 * 상품 수정
 */
export const updateProduct = withAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userId = (req as any).user.id;
  const patch = req.body as UpdateProductRequestDTO;
  const product = await service.update(id, userId, patch);
  res.json(product);
});

/**
 * DELETE /products/:id
 * 상품 삭제
 */
export const deleteProduct = withAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userId = (req as any).user.id;
  await service.remove(id, userId);
  res.status(204).end();
});

/**
 * GET /products
 * 상품 목록 조회
 */
export const getProductList = withAsync(async (req: Request, res: Response) => {
  const query = req.query as unknown as ListProductsQueryDTO;
  // querystring은 string 타입이라 parse 필요
  const q: ListProductsQueryDTO = {
    page: Number(query.page ?? 1),
    pageSize: Number(query.pageSize ?? 10),
    keyword: query.keyword,
    orderBy: query.orderBy,
  };
  const list = await service.list(q);
  res.json(list);
});

/**
 * POST /products/:id/like
 * 좋아요 추가
 */
export const addProductLike = withAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userId = (req as any).user.id;
  const result = await service.like(id, userId);
  res.json(result);
});

/**
 * DELETE /products/:id/like
 * 좋아요 취소
 */
export const removeProductLike = withAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const userId = (req as any).user.id;
  const result = await service.unlike(id, userId);
  res.json(result);
});
