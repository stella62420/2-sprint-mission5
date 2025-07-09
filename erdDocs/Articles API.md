# 📰 Articles API

게시글 CRUD 및 좋아요 기능을 제공합니다.

---

## GET /articles

게시글 목록 조회

- Query Params:
  - `page`: 페이지 번호 (default: 1)
  - `pageSize`: 페이지 크기 (default: 10)
  - `keyword`: 검색어

- 응답 예시:
```json
{
  "list": [
    {
      "id": 1,
      "title": "제목",
      "content": "내용",
      "isLiked": false
    }
  ],
  "totalCount": 1
}
```

---

## GET /articles/:id

게시글 상세 조회

- 응답 예시:
```json
{
  "id": 1,
  "title": "제목",
  "content": "내용",
  "isLiked": true
}
```

- 오류:
```json
{
  "message": "article with id 999 not found"
}
```

---

## POST /articles

게시글 작성 (인증 필요)

- Body:
```json
{
  "title": "제목",
  "content": "내용",
  "image": null
}
```

- 응답:
```json
{
  "id": 2,
  "title": "제목",
  "content": "내용"
}
```

- 오류:
```json
{
  "message": "Invalid request body"
}
```

---

## PATCH /articles/:id

게시글 수정

- 오류 예시:
```json
{
  "message": "You do not have permission to update this article."
}
```

---

## DELETE /articles/:id

게시글 삭제

- 오류 예시:
```json
{
  "message": "article with id 123 not found"
}
```

---

## POST /articles/:id/likes

게시글 좋아요 추가

- 오류 예시:
```json
{
  "message": "Already liked this article."
}
```

---

## DELETE /articles/:id/likes

좋아요 취소

- 오류 예시:
```json
{
  "message": "Not liked this article yet."
}
```
