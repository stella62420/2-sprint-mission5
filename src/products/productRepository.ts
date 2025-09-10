import prisma from '../lib/prismaClient';
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
import type { IProductRepository } from './productRepository.interface';

export class PrismaProductRepository implements IProductRepository {
  async create(
    data: CreateProductRequestDTO & { userId: number }
  ): Promise<ProductDetailDTO> {
    const row = await prisma.product.create({
      data: {
        userId: data.userId,
        title: data.title,
        description: data.description ?? null,
        price: data.price,
        category: data.category ?? null,
        images: data.images ?? [],
      },
    });

    return {
      id: row.id,
      title: row.title,
      description: row.description ?? null,
      price: row.price,
      images: row.images,
      category: row.category ?? null,
      createdAt: row.createdAt,
    } as unknown as ProductDetailDTO;
  }

  async findById(id: number): Promise<ProductDetailDTO | null> {
    const row = await prisma.product.findUnique({
      where: { id },
      include: { _count: { select: { Likes: true } } },
    });
    if (!row) return null;

    return {
      id: row.id,
      title: row.title,
      description: row.description ?? null,
      price: row.price,
      images: row.images,
      category: row.category ?? null,
      createdAt: row.createdAt,
      likes: row._count.Likes,
    } as unknown as ProductDetailDTO;
  }

  async findMany(
    q: ListProductsQueryDTO,
    _userId?: number
  ): Promise<Paginated<ProductSummaryDTO>> {
    const page = q.page ?? 1;
    const pageSize = q.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (q.q) where.title = { contains: q.q };

    const orderBy =
      q.orderBy === 'priceAsc'
        ? { price: 'asc' as const }
        : q.orderBy === 'priceDesc'
        ? { price: 'desc' as const }
        : { createdAt: 'desc' as const };

    const [rows, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        include: { _count: { select: { Likes: true } } },
      }),
      prisma.product.count({ where }),
    ]);

    const items: ProductSummaryDTO[] = rows.map((r) => ({
      id: r.id,
      title: r.title,
      price: r.price,
      images: r.images,
      category: r.category ?? null,
      createdAt: r.createdAt,
      likes: r._count.Likes,
    })) as unknown as ProductSummaryDTO[];

    return { items, total } as Paginated<ProductSummaryDTO>;
  }

  async update(args: {
    id: number;
    userId: number;
    dto: UpdateProductRequestDTO;
  }): Promise<ProductDetailDTO> {
    const { id, userId, dto } = args;

    const { count } = await prisma.product.updateMany({
      where: { id, userId },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description ?? null }
          : {}),
        ...(dto.price !== undefined ? { price: dto.price } : {}),
        ...(dto.category !== undefined ? { category: dto.category ?? null } : {}),
        ...(dto.images !== undefined ? { images: dto.images ?? [] } : {}),
      },
    });

    if (count === 0) {
      const err: any = new Error('forbidden');
      err.status = 403;
      throw err;
    }

    const row = await prisma.product.findUnique({
      where: { id },
      include: { _count: { select: { Likes: true } } },
    });

    return {
      id: row!.id,
      title: row!.title,
      description: row!.description ?? null,
      price: row!.price,
      images: row!.images,
      category: row!.category ?? null,
      createdAt: row!.createdAt,
      likes: row!._count.Likes,
    } as unknown as ProductDetailDTO;
  }

  async remove(args: { id: number; userId: number }): Promise<void> {
    const { id, userId } = args;

    const { count } = await prisma.product.deleteMany({
      where: { id, userId },
    });

    if (count === 0) {
      const err: any = new Error('forbidden');
      err.status = 403;
      throw err;
    }
  }

  async addLike({ id, userId }: { id: number; userId: number }): Promise<void> {
    await prisma.productLike.upsert({
      where: { productId_userId: { productId: id, userId } },
      create: { productId: id, userId },
      update: {},
    });
  }

  async removeLike({ id, userId }: { id: number; userId: number }): Promise<void> {
    await prisma.productLike.deleteMany({
      where: { productId: id, userId },
    });
  }

  async countLikes(id: number): Promise<number> {
    return prisma.productLike.count({ where: { productId: id } });
  }
}
