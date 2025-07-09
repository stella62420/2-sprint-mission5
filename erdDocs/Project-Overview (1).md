# 📘 소개 및 실행 방법

이 문서는 PandaMarket 백엔드 프로젝트의 개요와 실행 환경, 초기 설정 방법 등을 설명합니다.

---

## 🧩 프로젝트 개요

- Node.js + Express 기반 RESTful API 서버
- TypeScript 기반 코드 구조
- Prisma ORM 사용 (PostgreSQL, MySQL 등과 연동 가능)
- 주요 도메인: 사용자, 게시글, 상품, 댓글, 이미지 업로드
- JWT 기반 인증 시스템 (Access + Refresh Token)
- 유효성 검사: Superstruct 사용

---

## 🛠 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 파일 (.env) 작성

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
```

### 3. 데이터베이스 초기화

```bash
npx prisma migrate dev --name init
```

또는 기존 DB에 맞춰 적용할 경우:

```bash
npx prisma db pull
```

### 4. 개발 서버 실행

```bash
npm run dev
```

### 5. 빌드 및 실행

```bash
npm run build
npm start
```

---

## 📂 주요 디렉토리

```
src/
├── auth/         # 사용자 인증
├── articles/     # 게시글
├── products/     # 상품
├── comments/     # 댓글
├── images/       # 이미지 업로드
├── middleware/   # 인증, 유효성 검증
├── lib/          # 공통 유틸리티, prisma, jwt, error 등
└── main.ts       # 앱 진입점
```

---

## 📌 기타

- Postman 또는 Swagger 문서로 API 테스트 권장
- ERD 및 상세 API 명세는 Wiki 문서를 참고하세요.


---

## 🧱 사용된 기술 스택 상세

| 범주 | 스택 / 기술 | 설명 |
|------|--------------|------|
| 언어 | TypeScript | 정적 타입 언어로 안정적인 백엔드 로직 작성 가능 |
| 서버 프레임워크 | Express.js | 경량 HTTP 서버 프레임워크로 라우팅/미들웨어 관리 |
| ORM | Prisma | 타입 안전한 ORM. DB 모델 정의 및 쿼리 간편화 |
| DB | PostgreSQL/MySQL (선택 가능) | `.env`의 DATABASE_URL에 따라 결정됨 |
| 인증 | JWT (jsonwebtoken) | Access/Refresh Token 방식의 사용자 인증 구현 |
| 암호화 | bcrypt | 비밀번호 해시 및 비교에 사용 |
| 데이터 검증 | superstruct | 요청 body, query, params 구조화 및 유효성 검사 |
| 환경변수 관리 | dotenv | `.env` 파일을 통해 민감 정보 및 설정 관리 |
| 요청 자동 처리 | ts-node + nodemon | TypeScript 파일을 실시간으로 실행하고 변경 감지 리로드 |
| 정적 파일 | multer | 이미지 업로드 및 서버 로컬 저장 처리 |
| 에러 처리 | 커스텀 Error 클래스 + 글로벌 핸들러 | `BadRequestError`, `NotFoundError` 등으로 상황별 에러 핸들링 |
| 코드 스타일 | Prettier | 코드 포맷팅 및 일관된 스타일 유지 |

---

## ✨ 특징

- Prisma를 통해 DB 작업에서 코드 자동완성과 타입 보장 가능
- 요청 스키마 유효성 검사와 라우팅에 `superstruct + validate 미들웨어` 조합 활용
- 인증 토큰은 JWT로 발급하며, refreshToken은 DB에 저장하여 보안 강화
- 파일 업로드는 `multer`로 처리하고 `/public` 폴더에 저장

