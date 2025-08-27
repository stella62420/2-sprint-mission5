# 📘 소개 및 실행 방법

이 문서는 PandaMarket 백엔드 프로젝트의 개요와 실행 환경, 초기 설정 방법 등을 설명합니다.

---

## 🧩 프로젝트 개요

- Node.js + Express 기반 RESTful API 서버
- TypeScript 기반 코드 구조
- Prisma ORM 사용 (PostgreSQL, MySQL 등 지원)
- 주요 도메인: 사용자, 게시글, 상품, 댓글, 이미지 업로드, 알림(Notification)
- JWT 기반 인증 시스템 (Access + Refresh Token)
- 유효성 검사: Superstruct 사용
- 실시간 알림 전송: Socket.IO 게이트웨이 활용

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
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_EXPIRES_IN=15m
REFRESH_EXPIRES_IN=7d
SOCKET_ORIGINS=http://localhost:3000
```

### 3. 데이터베이스 초기화
```bash
npx prisma migrate dev --name init
```
혹은 기존 DB 스키마 불러오기:
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
├── auth/           # 사용자 인증
├── users/          # 사용자 관리
├── articles/       # 게시글
├── products/       # 상품
├── comments/       # 댓글
├── images/         # 이미지 업로드
├── notifications/  # 알림 + socket.io gateway
├── middleware/     # 인증, 유효성 검증
├── lib/            # 공통 유틸리티 (prisma, jwt, errors, logger 등)
├── app.ts          # Express 앱 설정
└── main.ts         # 서버 실행 (HTTP + Socket.IO 초기화)
```

---

## 📌 기타
- Postman, Swagger 또는 GitHub Wiki 문서 기반으로 API 테스트 권장
- ERD 및 상세 API 명세는 `/docs` 또는 Wiki 참고

---

## 🧱 사용된 기술 스택 상세

| 범주 | 스택 / 기술 | 설명 |
|------|--------------|------|
| 언어 | TypeScript | 정적 타입 기반 안정적 코드 작성 |
| 서버 프레임워크 | Express.js | 라우팅/미들웨어 관리 |
| ORM | Prisma | 타입 안전한 ORM |
| DB | PostgreSQL/MySQL | DATABASE_URL 설정에 따름 |
| 인증 | JWT (jsonwebtoken) | Access/Refresh Token 방식 |
| 암호화 | bcrypt | 비밀번호 해시 |
| 데이터 검증 | superstruct | 요청 body/query/params 검증 |
| 환경변수 관리 | dotenv | `.env` 기반 |
| 정적 파일 | multer | 이미지 업로드 및 저장 |
| 실시간 기능 | Socket.IO | 알림 전송 (댓글/가격변경 등) |
| 에러 처리 | 커스텀 Error 클래스 | `NotFoundError`, `ForbiddenError`, `HttpError` 등 |
| 코드 스타일 | Prettier | 코드 포맷팅 |

---

## ✨ 특징
- Layered Architecture (Controller → Service → Repository → Prisma)
- DTO/Struct 분리로 요청/응답 스키마 명확
- 알림(Notification) 기능:
  - DB 저장 + 읽음 처리 + 안읽은 개수 조회
  - Socket.IO 기반 실시간 알림 푸시
- 전역 에러 핸들러와 커스텀 에러 클래스로 일관된 예외 처리
