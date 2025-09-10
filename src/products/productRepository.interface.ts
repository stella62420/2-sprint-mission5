import type {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
  ListProductsQueryDTO,
} from './dtos/product.request.dto';
import type {
  ProductSummaryDTO,
  ProductDetailDTO,
} from './dtos/product.response.dto';
import type { Paginated } from './dtos/product.response.dto';

export interface IProductRepository {
  create(data: CreateProductRequestDTO & { userId: number }): Promise<ProductDetailDTO>;
  findById(id: number): Promise<ProductDetailDTO | null>;
  findMany(
    query: ListProductsQueryDTO,
    userId?: number
  ): Promise<Paginated<ProductSummaryDTO>>;
  update(args: { id: number; userId: number; dto: UpdateProductRequestDTO }): Promise<ProductDetailDTO>;
  remove(args: { id: number; userId: number }): Promise<void>;
  addLike(args: { id: number; userId: number }): Promise<void>;
  removeLike(args: { id: number; userId: number }): Promise<void>;
  countLikes(id: number): Promise<number>;
}
