import request from 'supertest';
import app from '../src/app';
import { ex, exIn, uid } from './test-utils';

describe('[INT] Auth', () => {
  test('회원가입 201', async () => {
    const email = `${uid('auth')}@test.com`;
    const res = await ex(
      request(app)
        .post('/auth/register')
        .send({ email, nickname: uid('n'), password: 'Test1234!' }),
      201,
    );
    expect(res.body?.id ?? res.body?.data?.id).toBeDefined();
  });

  test('로그인 200', async () => {
    const email = `${uid('auth')}@test.com`;
    await request(app)
      .post('/auth/register')
      .send({ email, nickname: uid('n'), password: 'Test1234!' });
    const res = await ex(
      request(app).post('/auth/login').send({ email, password: 'Test1234!' }),
      200,
    );
    expect(res.body?.accessToken || res.body?.token || res.body?.data?.token).toBeTruthy();
  });

  test('잘못된 비밀번호 ⇒ 400/401', async () => {
    const email = `${uid('auth')}@test.com`;
    await request(app)
      .post('/auth/register')
      .send({ email, nickname: uid('n'), password: 'Test1234!' });

    await exIn(
      request(app).post('/auth/login').send({ email, password: 'Wrong!' }),
      [400, 401],
    );
  });
});
