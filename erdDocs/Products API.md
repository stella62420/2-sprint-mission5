# 🛒 Products API

## GET /products
상품 목록 조회

### Request
Query: `page`, `pageSize`, `keyword`, `orderBy` (newest|oldest|priceAsc|priceDesc)

### Response
```json
{
  "items": [
    { "id": 1, "title": "MacBook", "price": 2000, "images": [], "createdAt": "..." }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 1
}
```

### Known Errors
- `InternalServerError`

---

## POST /products
상품 등록 (인증 필요)

### Request
```json
{ "title": "MacBook", "description": "상세", "price": 2000, "images": [] }
```

### Response
```json
{ "id": 1, "title": "MacBook", "description": "상세", "price": 2000, "images": [], "createdAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`
- `ValidationError`
- `InternalServerError`

---

## GET /products/:id
상품 상세 조회

### Response
```json
{
  "id": 1,
  "title": "MacBook",
  "description": "상세",
  "price": 2000,
  "images": [],
  "likes": 3,
  "liked": true,
  "createdAt": "...",
  "seller": { "id": 9, "nickname": "alice" }
}
```

### Known Errors
- `NotFoundError(404)`
- `InternalServerError`

---

## PATCH /products/:id
상품 수정 (작성자만)  
가격 변경 시 좋아요한 유저들에게 알림 전송 🔔

### Request
```json
{ "title": "수정된 이름", "price": 1800 }
```

### Response
```json
{ "id": 1, "title": "수정된 이름", "price": 1800, "updatedAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`
- `NotFoundError(404)`
- `ValidationError`
- `InternalServerError`

---

## DELETE /products/:id
상품 삭제 (작성자만)

### Response
`204 No Content`

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`
- `NotFoundError(404)`
- `InternalServerError`

---

## POST /products/:id/like
상품 좋아요 (인증 필요)

### Response
```json
{ "liked": true, "likes": 4 }
```

### Known Errors
- `UnauthorizedError(401)`
- `NotFoundError(404)`
- `InternalServerError`

---

## DELETE /products/:id/like
상품 좋아요 취소 (인증 필요)

### Response
```json
{ "liked": false, "likes": 3 }
```

### Known Errors
- `UnauthorizedError(401)`
- `NotFoundError(404)`
- `InternalServerError`
