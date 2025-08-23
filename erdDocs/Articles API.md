# 📰 Articles API

## GET /articles
게시글 목록 조회

### Request
Query: `page`, `pageSize`, `keyword`

### Response
```json
{
  "items": [
    { "id": 1, "title": "첫 글", "content": "내용...", "likes": 3, "createdAt": "..." }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 1
}
```

### Known Errors
- `InternalServerError`

---

## POST /articles
게시글 작성 (인증 필요)

### Request
```json
{ "title": "제목", "content": "내용" }
```

### Response
```json
{ "id": 1, "title": "제목", "content": "내용", "authorId": 1, "createdAt": "..." }
```

### Known Errors
- `UnauthorizedError(401)`: 인증 실패
- `ValidationError`
- `InternalServerError`

---

## GET /articles/:id
게시글 상세 조회

### Response
```json
{ "id": 1, "title": "제목", "content": "내용", "authorId": 1, "createdAt": "..." }
```

### Known Errors
- `NotFoundError(404)`: Article not found
- `InternalServerError`

---

## PATCH /articles/:id
게시글 수정 (작성자만)

### Request
```json
{ "title": "수정된 제목", "content": "수정된 내용" }
```

### Response
```json
{ "id": 1, "title": "수정된 제목", "content": "수정된 내용", "authorId": 1 }
```

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`: 권한 없음
- `NotFoundError(404)`: Article not found
- `ValidationError`
- `InternalServerError`

---

## DELETE /articles/:id
게시글 삭제 (작성자만)

### Response
`204 No Content`

### Known Errors
- `UnauthorizedError(401)`
- `ForbiddenError(403)`
- `NotFoundError(404)`
- `InternalServerError`

---

## POST /articles/:id/like
게시글 좋아요 (인증 필요)

### Response
```json
{ "liked": true, "likes": 4 }
```

### Known Errors
- `UnauthorizedError(401)`
- `NotFoundError(404)`
- `InternalServerError`

---

## DELETE /articles/:id/like
좋아요 취소 (인증 필요)

### Response
```json
{ "liked": false, "likes": 3 }
```

### Known Errors
- `UnauthorizedError(401)`
- `NotFoundError(404)`
- `InternalServerError`
