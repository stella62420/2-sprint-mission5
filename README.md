# 코드잇 백엔드 - Sprint 8 미션

---

## ✅ 미션 목표

---

## 📌 기본 요구 사항

> ✅ 아래 요구사항을 **모두 충족**하도록 구현했습니다. 각 항목별 **REST API + 실시간 수신**이 연결됩니다.

### 1) 알림

* **내 알림 목록 조회**

  * `GET /notifications/me?page=1&pageSize=10`
* **내 안 읽은 알림 개수**

  * `GET /notifications/me/unread-count`
* **알림 읽음 처리**

  * `PATCH /notifications/:id/read`
  * body 없음(토글 아님, 읽음으로 고정)

### 2) 알림 전송(트리거)

* **좋아요한 상품의 가격이 변동**되었을 때 해당 **좋아요 유저**에게 알림

  * `PATCH /products/:id` 로 price 변경 시
* **내가 작성한 글에 댓글**이 달렸을 때 **글 작성자**에게 알림

  * `POST /articles/:articleId/comments`
  * `POST /products/:productId/comments`

### 3) 실시간 수신 (Socket.IO)

* 클라이언트 연결:

  * `io("…", { auth: { token: "<AccessToken>" } })`
* 서버 게이트웨이:

  * 핸드셰이크에서 **JWT 검증**, `socket.data.user = { id… }`
  * 접속 시 `socket.join("user-{id}")`
  * 서버 유틸 `sendNotification(userId, payload)` → `io.to("user-{id}").emit("notification", payload)`

---

## 🧱 심화 요구 사항


---

## 🔧 주요 변경사항

### 1) 데이터 모델(Prisma)

* `Notification` 모델 추가

  * `id, userId, type('PRICE_CHANGE'|'COMMENT'), message, meta(JSON), isRead, createdAt`
  * `userId` 인덱스, `createdAt` desc 정렬 기본
* `ProductLike` 복합 키 보강, `Product`/`Article` 관계 정리
* 마이그레이션

  ```bash
  npx prisma migrate dev
  ```

### 2) 인증/미들웨어

* `authenticateUser` / `optionalAuthenticateUser`

  * `Authorization: Bearer <token>` 파싱 → `verifyAccessToken` → `req.user` 주입
* `errorHandler` 표준화

  * Validation(`StructError`) 400, 커스텀 `HttpError`류는 지정 상태코드, 나머지 500

### 3) Socket.IO 게이트웨이

* `notification.gateway.ts`

  * `initNotificationGateway(httpServer)`로 초기화
  * 핸드셰이크 인증(`handshake.auth.token` 또는 `Authorization` 헤더)
  * 유저별 룸 조인, `sendNotification(userId, data)` 유틸 제공
* 서버 부팅부(`main.ts`)에서 **HTTP 서버 생성 → 게이트웨이 주입**

### 4) 알림 서비스/리포지토리

* 생성: `create({ userId, type, message, meta })`
* 조회: `listByUser({ userId, page, pageSize })`
* 안 읽은 개수: `countUnread(userId)`
* 읽음 처리: `markAsRead(id, userId)`
* **비즈니스 트리거 연동**

  * 가격 변경 시: `ProductService.update()` 안에서 price 변경 감지 → 좋아요 유저 목록 조회 → 알림 생성 + 소켓 푸시
  * 댓글 작성 시: `CommentService.create()` 안에서 대상 글 작성자에게 알림 생성 + 소켓 푸시

### 5) 레이어드/DTO 정리 (예: Products)

* `src/products/`

  * `dtos/product.request.dto.ts`, `dtos/product.response.dto.ts`
  * `productRepository.ts`(Prisma 접근)
  * `productService.ts`(비즈니스)
  * `productsController.ts`(입출력 + 미들웨어)
  * **컨트롤러에서 서비스 생성 시** `new ProductService(new PrismaProductRepository())` 주입

### 6) 문서/개발 편의

* `docs/*`(API 명세) 업데이트

---

## 🖼 스크린샷

---

## 🙋 멘토에게

저번 스프린트에서 미처 적용하지 못했던 **레이어드 아키텍처와 DTO 구조**를 이번에 전체적으로 반영했습니다.
처음에는 **Socket.IO를 이벤트 기반으로만** 단순 연결할까 고민했는데, 어차피 구조를 정리하면서 DTO와 서비스 계층까지 다듬는 김에 **알림(Notification) 기능 자체를 비즈니스 로직으로 통합**하는 방식으로 구현했습니다.

* 컨트롤러는 입출력만 담당하고
* 서비스 계층에서 알림 생성/전송 로직을 처리하며
* DTO로 요청/응답을 명확히 정의했습니다.

이 과정에서 알림도 단순한 이벤트가 아니라 **하나의 도메인 기능**으로 다뤄지게 되어, 이후 유지보수나 확장성 측면에서도 더 깔끔하게 관리할 수 있을 것 같습니다.


---
