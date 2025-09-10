# 💬 Comments API

## GET /comments
댓글 목록 조회

### Request
Query: `targetType=article|product`, `targetId`, `page`, `pageSize`

### Response
```json
{
  "items": [
    { "id": 1, "content": "댓글 내용", "user": { "id": 2, "nickname": "작성자" }, "createdAt": "..." }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 1
}
```

### Known Errors
- `ValidationError`
- `InternalServerError`

---

## POST /articles/:id/comments
게시글에 댓글 작성 (인증 필요)

### Request
```json
{ "content": "댓글 내용" }
```

### Response
```json
{ "id": 1, "content": "댓글 내용", "articleId": 1, "userId": 2, "createdAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`
- `NotFoundError(404)`: Article not found
- `ValidationError`
- `InternalServerError`

---

## POST /products/:id/comments
상품에 댓글 작성 (인증 필요)

### Request
```json
{ "content": "댓글 내용" }
```

### Response
```json
{ "id": 1, "content": "댓글 내용", "productId": 1, "userId": 2, "createdAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`
- `NotFoundError(404)`: Product not found
- `ValidationError`
- `InternalServerError`

---

## PATCH /comments/:id
댓글 수정 (작성자만)

### Request
```json
{ "content": "수정된 댓글" }
```

### Response
```json
{ "id": 1, "content": "수정된 댓글", "userId": 2, "updatedAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`
- `NotFoundError(404)`
- `ValidationError`
- `InternalServerError`

---

## DELETE /comments/:id
댓글 삭제 (작성자만)

### Response
`204 No Content`

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`
- `NotFoundError(404)`
- `InternalServerError`
