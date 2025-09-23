import prisma from '../lib/prismaClient';
import type {
  ListCommentsQueryDTO,
  CreateCommentRequestDTO,
  UpdateCommentRequestDTO,
} from './dtos/comment.request.dto';
import type { Comment } from '@prisma/client';

export interface ICommentRepository {
  findById(id: number): Promise<Comment | null>;
  list(q: ListCommentsQueryDTO): Promise<{ items: Comment[]; total: number }>;
  create(data: CreateCommentRequestDTO & { userId: number }): Promise<Comment>;
  update(id: number, patch: UpdateCommentRequestDTO): Promise<Comment>;
  delete(id: number): Promise<void>;

  targetExists(type: 'product' | 'article', id: number): Promise<boolean>;

  findArticleAuthor(articleId: number): Promise<{ id: number; title: string; authorId: number } | null>;
  findProductSeller(productId: number): Promise<{ id: number; title: string; userId: number } | null>;
}

export class PrismaCommentRepository implements ICommentRepository {
  async findById(id: number) {
    return prisma.comment.findUnique({ where: { id } });
  }

  async list({ page, pageSize, targetType, targetId, userId }: ListCommentsQueryDTO) {
    const where: any = {};
    if (typeof userId === 'number') where.userId = userId;

    if (targetType && typeof targetId === 'number') {
      if (targetType === 'product') where.productId = targetId;
      else where.articleId = targetId;
    } else if (typeof targetId === 'number' && !targetType) {
      where.OR = [{ productId: targetId }, { articleId: targetId }];
    }

    const [items, total] = await Promise.all([
      prisma.comment.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.comment.count({ where }),
    ]);
    return { items, total };
  }

  async create(data: CreateCommentRequestDTO & { userId: number }) {
    const payload =
      data.targetType === 'product'
        ? { content: data.content, userId: data.userId, productId: data.targetId }
        : { content: data.content, userId: data.userId, articleId: data.targetId };

    return prisma.comment.create({ data: payload as any });
  }

  async update(id: number, patch: UpdateCommentRequestDTO) {
    return prisma.comment.update({ where: { id }, data: patch });
  }

  async delete(id: number) {
    await prisma.comment.delete({ where: { id } });
  }

  async targetExists(type: 'product' | 'article', id: number) {
    if (type === 'product') {
      const x = await prisma.product.findUnique({ where: { id }, select: { id: true } });
      return !!x;
    }
    const y = await prisma.article.findUnique({ where: { id }, select: { id: true } });
    return !!y;
  }

  async findArticleAuthor(articleId: number) {
    return prisma.article.findUnique({
      where: { id: articleId },
      select: { id: true, title: true, authorId: true },
    });
  }

  async findProductSeller(productId: number) {
    return prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, title: true, userId: true },
    });
  }
}
