import type {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
  ListProductsQueryDTO,
} from './dtos/product.request.dto';
import type {
  ProductSummaryDTO,
  ProductDetailDTO,
  Paginated,
} from './dtos/product.response.dto';
import NotFoundError from '../lib/errors/NotFoundError';

export default class ProductService {
  constructor(private readonly repo: any) {}

  private getOwnerId(row: any): number | undefined {
    return (
      row?.authorId ??
      row?.userId ??
      row?.ownerId ??
      row?.author?.id
    );
  }

  async list(
    query: ListProductsQueryDTO,
    userId?: number
  ): Promise<Paginated<ProductSummaryDTO>> {
    if (this.repo?.findMany) return this.repo.findMany(query, userId);
    throw new Error('Repository does not implement findMany');
  }

  async getById(id: number, userId?: number): Promise<ProductDetailDTO> {
    const found = this.repo?.findById ? await this.repo.findById(id, userId) : null;
    if (!found) throw new NotFoundError(`product ${id} not found`);
    return found as ProductDetailDTO;
  }

  async create(dto: CreateProductRequestDTO, userId: number): Promise<ProductDetailDTO> {
    if (this.repo?.create) return this.repo.create({ ...dto, userId });
    throw new Error('Repository does not implement create');
  }

  async update(
    id: number,
    userId: number,
    dto: UpdateProductRequestDTO
  ): Promise<ProductDetailDTO> {
    if (!this.repo?.update) throw new Error('Repository does not implement update');

    const found = this.repo?.findById ? await this.repo.findById(id, userId) : null;
    if (!found) throw new NotFoundError(`product ${id} not found`);

    const ownerId = this.getOwnerId(found);
    if (typeof ownerId === 'number' && ownerId !== userId) {
      const err: any = new Error('forbidden');
      err.status = 403;
      throw err;
    }
    return this.repo.update({ id, userId, dto });
  }

  async remove(id: number, userId: number): Promise<void> {
    if (!this.repo?.remove) throw new Error('Repository does not implement remove');

    const found = this.repo?.findById ? await this.repo.findById(id, userId) : null;
    if (!found) throw new NotFoundError(`product ${id} not found`);

    const ownerId = this.getOwnerId(found);
    if (typeof ownerId === 'number' && ownerId !== userId) {
      const err: any = new Error('forbidden');
      err.status = 403;
      throw err;
    }
    await this.repo.remove({ id, userId });
  }

  async like(id: number, userId: number): Promise<{ id: number; likes: number }> {
    if (this.repo?.addLike)      await this.repo.addLike({ id, userId });
    else if (this.repo?.like)    await this.repo.like(id, userId);

    const likes: number = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
    return { id, likes };
  }

  async unlike(id: number, userId: number): Promise<{ id: number; likes: number }> {
    if (this.repo?.removeLike)   await this.repo.removeLike({ id, userId });
    else if (this.repo?.unlike)  await this.repo.unlike(id, userId);

    const likes: number = this.repo?.countLikes ? await this.repo.countLikes(id) : 0;
    return { id, likes };
  }

  async addLike(id: number, userId: number)    { return this.like(id, userId); }
  async removeLike(id: number, userId: number) { return this.unlike(id, userId); }
}
