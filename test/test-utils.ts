import request, { Response, Test } from 'supertest';
import app from '../src/app';

/** Authorization 헤더 헬퍼 */
export const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

/** 짧은 uid (테스트용) */
export function uid(prefix = 't', n = 6) {
  const r = Math.random().toString(36).slice(2, 2 + n);
  const t = Date.now().toString(36).slice(-2);
  return `${prefix}${r}${t}`;
}

/** 기대 상태코드 1개 */
export async function ex(r: Test, status: number): Promise<Response> {
  const res = await r.set('x-expected-status', String(status));
  if (res.status !== status) {
    // eslint-disable-next-line no-console
    console.error(`[expect ${status}] got ${res.status}`, res.body ?? {});
  }
  expect(res.status).toBe(status);
  return res;
}

/** 기대 상태코드 여러 개(예: 400/401) */
export async function exIn(r: Test, codes: number[]): Promise<Response> {
  const expectSet = new Set(codes);
  const res = await r.set('x-expected-status', codes.join(','));
  if (!expectSet.has(res.status)) {
    console.error(`[expect ${codes.join('/')}] got ${res.status}`, res.body ?? {});
  }
  expect(expectSet.has(res.status)).toBe(true);
  return res;
}

/** 회원가입 + 로그인 → 토큰 반환 (라우트 자동 감지) */
export async function signupAndLogin() {
  const email = `${uid('u')}@example.com`;
  const password = 'pass1234';
  const nickname = uid('n');

  // 1) 회원가입: /auth/register 우선, 404면 /auth/signup 시도
  let res = await request(app).post('/auth/register').send({ email, password, nickname });
  if (res.status === 404) {
    res = await request(app).post('/auth/signup').send({ email, password, nickname });
  }
  if (res.status !== 201 && res.status !== 200) {
    console.error(`[expect 201] got ${res.status}`, res.body ?? {});
  }
  expect([200, 201]).toContain(res.status);

  // 2) 로그인
  const login = await ex(
    request(app).post('/auth/login').send({ email, password }),
    200
  );
  const token =
    login.body?.token ||
    login.body?.accessToken ||
    login.body?.data?.token;

  return { email, password, nickname, token };
}

/** 상품 하나 생성하고 id 반환 */
export async function seedProduct(token: string) {
  const created = await ex(
    request(app)
      .post('/products')
      .set(auth(token))
      .send({
        title: '테스트 상품',
        price: 12345,
        images: [],
        description: '설명',
      }),
    201,
  );
  return created.body?.id ?? created.body?.data?.id;
}

/** 게시글 하나 생성하고 id 반환 */
export async function seedArticle(token: string) {
  const created = await ex(
    request(app)
      .post('/articles')
      .set(auth(token))
      .send({
        title: '테스트제목',
        content: '테스트내용',
      }),
    201,
  );
  return created.body?.id ?? created.body?.data?.id;
}
