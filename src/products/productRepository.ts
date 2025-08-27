import type { Product } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import type {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
  ListProductsQueryDTO,
} from './dtos/product.request.dto';

export interface IProductRepository {
  create(data: CreateProductRequestDTO & { userId: number }): Promise<Product>;
  findById(id: number): Promise<(Product & { seller: { id: number; nickname: string } }) | null>;
  update(id: number, patch: UpdateProductRequestDTO): Promise<Product>;
  delete(id: number): Promise<void>;
  list(q: ListProductsQueryDTO): Promise<{ items: Product[]; total: number }>;
  countLikes(productId: number): Promise<number>;
  isLikedBy(productId: number, userId: number): Promise<boolean>;
  like(productId: number, userId: number): Promise<void>;
  unlike(productId: number, userId: number): Promise<void>;

  findLikedUsers(productId: number): Promise<{ id: number; email: string; nickname: string }[]>;
}

function toOrder(orderBy?: ListProductsQueryDTO['orderBy']) {
  switch (orderBy) {
    case 'oldest':
      return { createdAt: 'asc' } as const;
    case 'priceAsc':
      return { price: 'asc' } as const;
    case 'priceDesc':
      return { price: 'desc' } as const;
    default:
      return { createdAt: 'desc' } as const;
  }
}

export class PrismaProductRepository implements IProductRepository {
  create(data: CreateProductRequestDTO & { userId: number }) {
    return prismaClient.product.create({ data });
  }

  findById(id: number) {
    return prismaClient.product.findUnique({
      where: { id },
      include: { seller: { select: { id: true, nickname: true } } },
    }) as any;
  }

  update(id: number, patch: UpdateProductRequestDTO) {
    return prismaClient.product.update({ where: { id }, data: patch });
  }

  async delete(id: number) {
    await prismaClient.product.delete({ where: { id } });
  }

  async list({ page, pageSize, keyword, orderBy }: ListProductsQueryDTO) {
    const where: any = keyword
      ? { OR: [{ title: { contains: keyword } }, { description: { contains: keyword } }] }
      : {};

    const [items, total] = await Promise.all([
      prismaClient.product.findMany({
        where,
        orderBy: toOrder(orderBy),
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prismaClient.product.count({ where }),
    ]);
    return { items, total };
  }

  countLikes(productId: number) {
    return prismaClient.productLike.count({ where: { productId } });
  }

  async isLikedBy(productId: number, userId: number) {
    const row = await prismaClient.productLike.findUnique({
      where: { productId_userId: { productId, userId } },
    });
    return !!row;
  }

  async like(productId: number, userId: number) {
    await prismaClient.productLike.upsert({
      where: { productId_userId: { productId, userId } },
      update: {},
      create: { productId, userId },
    });
  }

  async unlike(productId: number, userId: number) {
    await prismaClient.productLike
      .delete({ where: { productId_userId: { productId, userId } } })
      .catch(() => {});
  }

  async findLikedUsers(productId: number) {
    const likes = await prismaClient.productLike.findMany({
      where: { productId },
      include: { user: { select: { id: true, email: true, nickname: true } } },
    });
    return likes.map((l) => l.user);
  }
}
