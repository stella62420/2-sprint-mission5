import request from 'supertest';
import app from '../src/app';

const uniq = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

describe('[SMOKE] protected endpoints accept a valid token', () => {
  it('public GETs work', async () => {
    const arts = await request(app).get('/articles').expect(200);
    expect(Array.isArray(arts.body)).toBe(true);

    const prods = await request(app).get('/products').expect(200);
    // 프로젝트마다 응답 형태가 다를 수 있어 유연하게 확인
    expect(Array.isArray(prods.body) || Array.isArray(prods.body?.items)).toBe(true);
  });

  it('token round trip works and protected POST /articles returns 201', async () => {
    const suffix = uniq();
    const email = `smoke+${suffix}@example.com`;
    const nickname = `smk_${suffix}`;
    const password = 'CorrectHorseBatteryStaple1!'; // 길이·복잡도 충분

    // 1) 회원가입 (항상 201이어야 함)
    await request(app)
      .post('/auth/signup')
      .send({ email, password, nickname })
      .expect(201);

    // 2) 로그인 → 토큰 추출
    const login = await request(app)
      .post('/auth/login')
      .send({ email, password })
      .expect(200);

    const token =
      login.body?.data?.accessToken ??
      login.body?.accessToken ??
      login.body?.token;

    expect(typeof token).toBe('string');

    // 3) 보호 API 호출
    await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'smoke', content: 'smoke test' })
      .expect(201);
  });
});
