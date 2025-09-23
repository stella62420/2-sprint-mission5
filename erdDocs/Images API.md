# 🖼 Images API

## POST /images/upload
이미지 업로드 (인증 필요일 수 있음)

### Request
FormData: `image` 필드 (multipart/form-data)

### Response
```json
{ "url": "/uploads/filename.png" }
```

### Known Errors
- `UnauthorizedError(401)`: 인증 필요 시
- `ValidationError`: 파일 누락/형식 오류
- `InternalServerError`
