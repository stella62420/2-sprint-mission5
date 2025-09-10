import type { ICommentRepository } from './commentRepository';
import type {
  CreateCommentRequestDTO,
  UpdateCommentRequestDTO,
  ListCommentsQueryDTO,
} from './dtos/comment.request.dto';
import type { CommentDTO, Paginated } from './dtos/comment.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';
import ForbiddenError from '../lib/errors/ForbiddenError';

import NotificationService from '../notifications/notificationService';
import { NotificationRepository } from '../notifications/notificationRepository';

const notificationService = new NotificationService(new NotificationRepository());

export default class CommentService {
  constructor(private repo: ICommentRepository) {}

  private toDTO(c: any): CommentDTO {
    return {
      id: c.id,
      content: c.content,
      user: { id: c.user?.id ?? c.userId, nickname: c.user?.nickname ?? '' },
      productId: c.productId ?? null,
      articleId: c.articleId ?? null,
      createdAt: c.createdAt,
    };
  }

  async get(id: number): Promise<CommentDTO> {
    const c = await this.repo.findById(id);
    if (!c) throw new NotFoundError('Comment not found');
    return this.toDTO(c);
  }

  async list(q: ListCommentsQueryDTO): Promise<Paginated<CommentDTO>> {
    const { items, total } = await this.repo.list(q);
    return {
      items: items.map((c) => this.toDTO(c)),
      page: q.page,
      pageSize: q.pageSize,
      total,
    };
  }

  async create(userId: number, dto: CreateCommentRequestDTO): Promise<CommentDTO> {
    const ok = await this.repo.targetExists(dto.targetType, dto.targetId);
    if (!ok) {
      throw new NotFoundError(
        dto.targetType === 'product' ? 'Product not found' : 'Article not found'
      );
    }

    const created = await this.repo.create({ ...dto, userId });

    if (dto.targetType === 'article') {
      const article = await this.repo.findArticleAuthor(dto.targetId);
      if (article && article.authorId !== userId) {
        await notificationService.create({
          userId: article.authorId,
          message: `게시글 "${article.title}"에 새로운 댓글이 달렸습니다.`,
        });
      }
    } else if (dto.targetType === 'product') {
      const product = await this.repo.findProductSeller(dto.targetId);
      if (product && product.userId !== userId) {
        await notificationService.create({
          userId: product.userId,
          message: `상품 "${product.title}"에 새로운 댓글이 달렸습니다.`,
        });
      }
    }

    return this.toDTO(created);
  }

  async update(id: number, userId: number, patch: UpdateCommentRequestDTO): Promise<CommentDTO> {
    const prev = await this.repo.findById(id);
    if (!prev) throw new NotFoundError('Comment not found');
    if (prev.userId !== userId) throw new ForbiddenError('Forbidden');

    const updated = await this.repo.update(id, patch);
    return this.toDTO(updated);
  }

  async remove(id: number, userId: number): Promise<void> {
    const prev = await this.repo.findById(id);
    if (!prev) throw new NotFoundError('Comment not found');
    if (prev.userId !== userId) throw new ForbiddenError('Forbidden');
    await this.repo.delete(id);
  }
}
