import type {
  CreateArticleRequestDTO,
  UpdateArticleRequestDTO,
  ListArticlesQueryDTO,
} from './dtos/article.request.dto';
import type {
  ArticleSummaryDTO,
  ArticleDetailDTO,
  Paginated,
} from './dtos/article.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';

export default class ArticleService {
  constructor(private readonly repo: any) {}

  async list(
    query: ListArticlesQueryDTO,
    userId?: number,
  ): Promise<Paginated<ArticleSummaryDTO>> {
    return await this.repo.findMany(query, userId);
  }

  async detail(id: number, userId?: number): Promise<ArticleDetailDTO> {
    const row: ArticleDetailDTO | null = await this.repo.findById(id, userId);
    if (!row) throw new NotFoundError('Article not found');
    return row;
  }

  async create(userId: number, dto: CreateArticleRequestDTO): Promise<ArticleDetailDTO> {
    return await this.repo.create(userId, dto);
  }

  async update(
    id: number,
    userId: number,
    dto: UpdateArticleRequestDTO,
  ): Promise<ArticleDetailDTO> {
    return await this.repo.update(id, userId, dto);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.repo.delete(id, userId);
  }

  async like(id: number, userId: number): Promise<{ id: number; likes: number }> {
    if (this.repo?.like) await this.repo.like(id, userId);
    const likes: number = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
    return { id, likes };
  }

  async unlike(id: number, userId: number): Promise<{ id: number; likes: number }> {
    if (this.repo?.unlike) await this.repo.unlike(id, userId);
    const likes: number = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
    return { id, likes };
  }
}
