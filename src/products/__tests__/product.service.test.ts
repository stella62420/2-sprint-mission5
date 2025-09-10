import { jest } from '@jest/globals';
import ProductService from '../productService';

describe('[UNIT] ProductService', () => {
  test('create', async () => {
    const repo: any = {
      create: jest.fn(() =>
        Promise.resolve({
          id: 1,
          title: '테스트',
          price: 1000,
          images: [],
          category: null,
          createdAt: new Date(),
        })
      ),
      countLikes: jest.fn(() => Promise.resolve(0)),
    };

    const svc: any = new (ProductService as any)(repo);

    const r = await svc.create({
      title: '테스트',
      price: 1000,
      images: [],
      description: '설명',
      authorId: 1,
    });

    expect(r.id).toBe(1);
    expect(repo.create).toHaveBeenCalled();
  });

  test('getById: NotFoundError', async () => {
    const repo: any = {
      create: jest.fn(() => Promise.resolve({ id: 1 })),
      countLikes: jest.fn(() => Promise.resolve(0)),
      findById: jest.fn(() => Promise.resolve(null)),
    };

    const svc: any = new (ProductService as any)(repo);

    await expect(svc.getById(999)).rejects.toThrow();
    expect(repo.findById).toHaveBeenCalledWith(999, undefined);
  });
});
