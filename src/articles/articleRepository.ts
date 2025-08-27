import type { Article } from '@prisma/client';
import { prismaClient } from '../lib/prismaClient';
import type {
  CreateArticleRequestDTO, UpdateArticleRequestDTO, ListArticlesQueryDTO
} from './dtos/article.request.dto';

export interface IArticleRepository {
  create(data: CreateArticleRequestDTO & { userId: number }): Promise<Article>;
  findById(id: number): Promise<(Article & { author: { id: number; nickname: string } }) | null>;
  update(id: number, patch: UpdateArticleRequestDTO): Promise<Article>;
  delete(id: number): Promise<void>;
  list(q: ListArticlesQueryDTO): Promise<{ items: Article[]; total: number }>;
  countLikes(articleId: number): Promise<number>;
  isLikedBy(articleId: number, userId: number): Promise<boolean>;
  like(articleId: number, userId: number): Promise<void>;
  unlike(articleId: number, userId: number): Promise<void>;
}

function toOrder(orderBy?: ListArticlesQueryDTO['orderBy']) {
  return orderBy === 'oldest' ? ({ createdAt: 'asc' } as const) : ({ createdAt: 'desc' } as const);
}

export class PrismaArticleRepository implements IArticleRepository {
  create(data: CreateArticleRequestDTO & { userId: number }) {
    const { userId, ...rest } = data;
    return prismaClient.article.create({
      data: {
        ...rest,
        authorId: userId,
      },
    });
  }

  findById(id: number) {
    return prismaClient.article.findUnique({
      where: { id },
      include: { author: { select: { id: true, nickname: true } } },
    }) as any;
  }

  update(id: number, patch: UpdateArticleRequestDTO) {
    return prismaClient.article.update({ where: { id }, data: patch });
  }

  async delete(id: number) {
    await prismaClient.article.delete({ where: { id } });
  }

  async list({ page, pageSize, keyword, orderBy }: ListArticlesQueryDTO) {
    const where: any = keyword
      ? { OR: [{ title: { contains: keyword } }, { content: { contains: keyword } }] }
      : {};
    const [items, total] = await Promise.all([
      prismaClient.article.findMany({
        where,
        orderBy: toOrder(orderBy),
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prismaClient.article.count({ where }),
    ]);
    return { items, total };
  }

  countLikes(articleId: number) {
    return prismaClient.articleLike.count({ where: { articleId } });
  }

  async isLikedBy(articleId: number, userId: number) {
    const row = await prismaClient.articleLike.findUnique({
      where: { articleId_userId: { articleId, userId } },
    });
    return !!row;
  }

  async like(articleId: number, userId: number) {
    await prismaClient.articleLike.upsert({
      where: { articleId_userId: { articleId, userId } },
      update: {},
      create: { articleId, userId },
    });
  }

  async unlike(articleId: number, userId: number) {
    await prismaClient.articleLike
      .delete({ where: { articleId_userId: { articleId, userId } } })
      .catch(() => {});
  }
}
