import request from 'supertest';
import app from '../src/app';
import { auth, ex, exIn, signupAndLogin } from './test-utils';

describe('[INT] 상품 API', () => {
  let token: string;
  let otherToken: string;
  let productId: number;

  const makeBody = (overrides: Record<string, any> = {}) => ({
    title: '테스트 상품',
    price: 12345,
    images: [],
    description: '설명',
    ...overrides,
  });

  beforeAll(async () => {
    ({ token } = await signupAndLogin());
    ({ token: otherToken } = await signupAndLogin());

    const created = await ex(
      request(app).post('/products').set(auth(token)).send(makeBody()),
      201
    );
    productId = created.body?.id ?? created.body?.data?.id;
  });

  it('공개 목록/상세 200', async () => {
    await ex(request(app).get('/products'), 200);
    await ex(request(app).get(`/products/${productId}`), 200);
  });

  it('비로그인 생성 401, 로그인 생성 201', async () => {
    await ex(
      request(app).post('/products').send(makeBody({ title: '비로그인 생성' })),
      401
    );

    const res = await ex(
      request(app).post('/products').set(auth(token)).send(makeBody({ title: '로그인 생성' })),
      201
    );
    expect(res.body?.id ?? res.body?.data?.id).toBeDefined();
  });

  it('작성자만 수정/삭제 (200/204)', async () => {
    await exIn(
      request(app)
        .patch(`/products/${productId}`)
        .set(auth(otherToken))
        .send({ title: '남의 수정' }),
      [403, 404]
    );

    await ex(
      request(app)
        .patch(`/products/${productId}`)
        .set(auth(token))
        .send({ title: '제목 수정됨' }),
      200
    );

    await ex(request(app).delete(`/products/${productId}`).set(auth(token)), 204);
  });
});
