import { prismaClient } from '../lib/prismaClient';
import type { IProductRepository } from './productRepository';
import type {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
  ListProductsQueryDTO,
} from './dtos/product.request.dto';
import type {
  ProductDetailDTO,
  ProductSummaryDTO,
  Paginated,
} from './dtos/product.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';
import ForbiddenError from '../lib/errors/ForbiddenError';

import NotificationService from '../notifications/notificationService';
import { NotificationRepository } from '../notifications/notificationRepository';

const notificationService = new NotificationService(new NotificationRepository());

export default class ProductService {
  constructor(private repo: IProductRepository) {}

  async create(userId: number, dto: CreateProductRequestDTO): Promise<ProductSummaryDTO> {
    const p = await this.repo.create({ ...dto, userId });
    const likes = await this.repo.countLikes(p.id);

    return {
      id: p.id,
      title: p.title,
      price: p.price,
      images: p.images ?? [],
      category: p.category ?? null,
      createdAt: p.createdAt,
      likes,
    };
  }

  async getById(id: number, authUserId?: number): Promise<ProductDetailDTO> {
    const p = await this.repo.findById(id);
    if (!p) throw new NotFoundError('Product not found');

    const [likes, liked] = await Promise.all([
      this.repo.countLikes(id),
      authUserId ? this.repo.isLikedBy(id, authUserId) : Promise.resolve(false),
    ]);

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      images: p.images ?? [],
      category: p.category ?? null,
      createdAt: p.createdAt,
      likes,
      liked,
      seller: { id: p.seller.id, nickname: p.seller.nickname },
    };
  }

  async update(id: number, userId: number, patch: UpdateProductRequestDTO): Promise<ProductSummaryDTO> {
  const prev = await this.repo.findById(id);
  if (!prev) throw new NotFoundError('Product not found');
  if (prev.userId !== userId) throw new ForbiddenError('Forbidden');

  const updated = await this.repo.update(id, patch);
  const likes = await this.repo.countLikes(id);

  if (patch.price && patch.price !== prev.price) {
    const likedUsers = await prismaClient.productLike.findMany({
      where: { productId: id },
      select: { userId: true },
    });

    for (const { userId } of likedUsers) {
      await notificationService.create({
        userId,
        message: `관심 상품 "${prev.title}"의 가격이 ${prev.price} → ${patch.price} 으로 변경되었습니다.`,
      });
    }
  }

  return {
    id: updated.id,
    title: updated.title,
    price: updated.price,
    images: updated.images ?? [],
    category: updated.category ?? null,
    createdAt: updated.createdAt,
    likes,
  };
}

  async updatePrice(id: number, userId: number, newPrice: number): Promise<ProductSummaryDTO> {
    const prev = await this.repo.findById(id);
    if (!prev) throw new NotFoundError('Product not found');
    if (prev.userId !== userId) throw new ForbiddenError('Forbidden');

    const p = await this.repo.update(id, { price: newPrice });
    const likes = await this.repo.countLikes(id);

    const likedUsers = await this.repo.findLikedUsers(id);
    for (const u of likedUsers) {
      await notificationService.create({
        userId: u.id,
        message: `관심상품 "${p.title}"의 가격이 ${newPrice}원으로 변경되었습니다.`,
      });
    }

    return {
      id: p.id,
      title: p.title,
      price: p.price,
      images: p.images ?? [],
      category: p.category ?? null,
      createdAt: p.createdAt,
      likes,
    };
  }

  async remove(id: number, userId: number) {
    const prev = await this.repo.findById(id);
    if (!prev) throw new NotFoundError('Product not found');
    if (prev.userId !== userId) throw new ForbiddenError('Forbidden');

    await this.repo.delete(id);
  }

  async list(q: ListProductsQueryDTO): Promise<Paginated<ProductSummaryDTO>> {
    const { items, total } = await this.repo.list(q);
    const likesArr = await Promise.all(items.map((i) => this.repo.countLikes(i.id)));

    const summaries = items.map((p, i) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      images: p.images ?? [],
      category: p.category ?? null,
      createdAt: p.createdAt,
      likes: likesArr[i],
    }));

    return { items: summaries, page: q.page, pageSize: q.pageSize, total };
  }

  async like(id: number, userId: number) {
    await this.repo.like(id, userId);
    const likes = await this.repo.countLikes(id);
    return { liked: true, likes };
  }

  async unlike(id: number, userId: number) {
    await this.repo.unlike(id, userId);
    const likes = await this.repo.countLikes(id);
    return { liked: false, likes };
  }
}
