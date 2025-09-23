import prisma from '../lib/prismaClient';

export type ArticleRow = {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: { id: number; nickname: string };
};

export class PrismaArticleRepository {
  async list(page = 1, pageSize = 20): Promise<ArticleRow[]> {
    const skip = (page - 1) * pageSize;
    return prisma.article.findMany({
      skip,
      take: pageSize,
      orderBy: { id: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { id: true, nickname: true } },
      },
    });
  }

  async findById(id: number): Promise<ArticleRow | null> {
    return prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { id: true, nickname: true } },
      },
    });
  }

  async create(userId: number, data: { title: string; content: string; image?: string | null }): Promise<ArticleRow> {
    const { title, content, image } = data;
    return prisma.article.create({
      data: {
        title,
        content,
        image: image ?? null,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { id: true, nickname: true } },
      },
    });
  }

  async update(id: number, data: Partial<{ title: string; content: string; image: string | null }>): Promise<ArticleRow> {
    return prisma.article.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        author: { select: { id: true, nickname: true } },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await prisma.article.delete({ where: { id } });
  }

}

export default PrismaArticleRepository;
