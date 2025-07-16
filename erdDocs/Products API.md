# 🛒 Product API

상품 등록, 조회, 수정, 삭제 등 커머스형 기능을 제공합니다.

---

## GET /products

상품 목록 조회 (검색/페이지네이션)

- Query Params:
  - `page`: 페이지 번호 (default: 1)
  - `pageSize`: 페이지 크기 (default: 10)
  - `keyword`: 제목/설명 검색어

- 응답 예시:
```json
{
  "list": [
    {
      "id": 1,
      "title": "MacBook",
      "description": "M3 MacBook Pro",
      "price": 2500000,
      "isLiked": false
    }
  ],
  "totalCount": 1
}
```

---

## GET /products/:id

상품 상세 조회

- 응답 예시:
```json
{
  "id": 1,
  "title": "MacBook",
  "description": "M3 MacBook Pro",
  "price": 2500000,
  "category": "Electronics",
  "images": [],
  "isLiked": true
}
```

- 오류:
```json
{
  "message": "product with id 999 not found"
}
```

---

## POST /products

상품 등록 (인증 필요)

- Body:
```json
{
  "title": "MacBook",
  "description": "M3 MacBook Pro",
  "price": 2500000,
  "category": "Electronics",
  "images": ["http://.../image.jpg"]
}
```

- 성공 응답:
```json
{
  "id": 1,
  "title": "MacBook",
  ...
}
```

---

## PATCH /products/:id

상품 수정

- 오류 예시:
```json
{
  "message": "You do not have permission to update this product."
}
```

---

## DELETE /products/:id

상품 삭제

- 오류 예시:
```json
{
  "message": "product with id 99 not found"
}
```

---

## POST /products/:id/likes

상품 좋아요 등록

- 오류 예시:
```json
{
  "message": "Already liked this product."
}
```

---

## DELETE /products/:id/likes

상품 좋아요 취소

- 오류 예시:
```json
{
  "message": "Not liked this product yet."
}
```

---

## POST /products/:id/comments

상품 댓글 등록

- Body:
```json
{
  "content": "이거 실물 예쁘나요?"
}
```

---

## GET /products/:id/comments

댓글 목록 조회

- 응답 예시:
```json
{
  "list": [{ "id": 1, "content": "이거 좋아요!" }],
  "nextCursor": null
}
```
