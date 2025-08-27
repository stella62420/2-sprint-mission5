import type { IArticleRepository } from './articleRepository';
import type {
  CreateArticleRequestDTO, UpdateArticleRequestDTO, ListArticlesQueryDTO
} from './dtos/article.request.dto';
import type {
  ArticleDetailDTO, ArticleSummaryDTO, Paginated
} from './dtos/article.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';
import ForbiddenError from '../lib/errors/ForbiddenError';

export default class ArticleService {
  constructor(private repo: IArticleRepository) {}

  async create(userId: number, dto: CreateArticleRequestDTO): Promise<ArticleSummaryDTO> {
    const a = await this.repo.create({ ...dto, userId });
    const likes = await this.repo.countLikes(a.id);
    return { id: a.id, title: a.title, image: a.image ?? null, createdAt: a.createdAt, likes };
  }

  async getById(id: number, authUserId?: number): Promise<ArticleDetailDTO> {
    const a = await this.repo.findById(id);
    if (!a) throw new NotFoundError('Article not found');

    const [likes, liked] = await Promise.all([
      this.repo.countLikes(id),
      authUserId ? this.repo.isLikedBy(id, authUserId) : Promise.resolve(false),
    ]);

    return {
      id: a.id,
      title: a.title,
      image: a.image ?? null,
      createdAt: a.createdAt,
      likes,
      liked,
      content: a.content,
      user: { id: a.author.id, nickname: a.author.nickname },
    };
  }

  async update(id: number, userId: number, patch: UpdateArticleRequestDTO): Promise<ArticleSummaryDTO> {
    const prev = await this.repo.findById(id);
    if (!prev) throw new NotFoundError('Article not found');
    if ((prev as any).authorId !== userId) throw new ForbiddenError('Forbidden');

    const a = await this.repo.update(id, patch);
    const likes = await this.repo.countLikes(id);
    return { id: a.id, title: a.title, image: a.image ?? null, createdAt: a.createdAt, likes };
  }

  async remove(id: number, userId: number): Promise<void> {
    const prev = await this.repo.findById(id);
    if (!prev) throw new NotFoundError('Article not found');
    if ((prev as any).authorId !== userId) throw new ForbiddenError('Forbidden');
    await this.repo.delete(id);
  }

  async list(q: ListArticlesQueryDTO): Promise<Paginated<ArticleSummaryDTO>> {
    const { items, total } = await this.repo.list(q);
    const likesArr = await Promise.all(items.map(i => this.repo.countLikes(i.id)));
    const summaries = items.map((a, i) => ({
      id: a.id, title: a.title, image: a.image ?? null, createdAt: a.createdAt, likes: likesArr[i],
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
