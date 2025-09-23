# 🔔 Notifications API

## GET /notifications/me
내 알림 목록 조회 (인증 필요)

### Request
Query: `page`, `pageSize`

### Response
```json
{
  "items": [
    { "id": 1, "message": "상품 'MacBook'에 새 댓글이 달렸습니다.", "isRead": false, "createdAt": "..." }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 1
}
```

### Known Errors
- `UnauthorizedError(401)`
- `InternalServerError`

---

## GET /notifications/me/unread-count
안 읽은 알림 개수 조회 (인증 필요)

### Response
```json
{ "count": 3 }
```

### Known Errors
- `UnauthorizedError(401)`
- `InternalServerError`

---

## PATCH /notifications/:id/read
알림 읽음 처리 (인증 필요)

### Request
```json
{ "isRead": true }
```

### Response
```json
{ "id": 1, "message": "상품 'MacBook'에 새 댓글이 달렸습니다.", "isRead": true, "createdAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`: 내 알림이 아님
- `NotFoundError(404)`
- `ValidationError`
- `InternalServerError`

---

# 🚀 Real-time (Socket.IO)
- 연결 시 JWT 인증 필요 (`handshake.auth.token` 혹은 `Authorization: Bearer`)
- 서버는 자동으로 `user-{id}` 방에 join 처리

### 클라이언트 수신 예시
```json
{ "message": "새 댓글이 달렸습니다.", "ts": "2025-08-23T12:00:00Z" }
```

### Known Errors (연결)
- `UnauthorizedError(401)`: 토큰 누락/검증 실패 (게이트웨이 미들웨어에서 연결 거부)
- `InternalServerError`
