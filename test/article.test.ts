import request from 'supertest';
import app from '../src/app';
import { auth, ex, exIn, seedArticle, signupAndLogin } from './test-utils';

describe('[INT] 게시글 API', () => {
  test('생성 201 → 목록/상세 200', async () => {
    const { token } = await signupAndLogin();
    const created = await ex(
      request(app)
        .post('/articles')
        .set(auth(token))
        .send({ title: 't', content: 'c' }),
      201,
    );
    const id = created.body?.id ?? created.body?.data?.id;

    const list = await ex(request(app).get('/articles'), 200);
    expect(Array.isArray(list.body)).toBe(true);

    const one = await ex(request(app).get(`/articles/${id}`), 200);
    expect(one.body?.id ?? one.body?.data?.id).toBe(id);
  });

  test('유효성 검사: title/content 누락 400', async () => {
    const { token } = await signupAndLogin();
    await exIn(
      request(app).post('/articles').set(auth(token)).send({}),
      [400],
    );
  });

  test('수정 200 / 삭제 204', async () => {
    const { token } = await signupAndLogin();
    const id = await seedArticle(token);

    await ex(
      request(app)
        .patch(`/articles/${id}`)
        .set(auth(token))
        .send({ title: '제목수정' }),
      200,
    );

    await ex(request(app).delete(`/articles/${id}`).set(auth(token)), 204);
  });
});
