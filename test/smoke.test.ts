import request from 'supertest';
import app from '../src/app';
import { auth, ex, signupAndLogin } from './test-utils';

describe('[SMOKE] protected endpoints accept a valid token', () => {
  test('token round trip works and protected POST /articles returns 201', async () => {
    const { token } = await signupAndLogin();

    await ex(
      request(app)
        .post('/articles')
        .set(auth(token))
        .send({ title: 'smoke', content: 'ok' }),
      201,
    );
  });

  test('public GETs work', async () => {
    await ex(request(app).get('/articles'), 200);
    await ex(request(app).get('/products'), 200);
  });
});
