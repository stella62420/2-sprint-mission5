# 🔐 Auth API

## POST /auth/register
회원가입

### Request
```json
{ "email": "test@example.com", "password": "1234", "nickname": "tester" }
```

### Response
```json
{
  "user": { "id": 1, "email": "test@example.com", "nickname": "tester" },
  "accessToken": "jwt...",
  "refreshToken": "jwt..."
}
```

### Known Errors
- `HttpError(409)`: Email already in use
- `ValidationError`: 요청 Body 검증 실패 (Struct/Zod)
- `InternalServerError`: 서버 내부 오류

---

## POST /auth/login
로그인

### Request
```json
{ "email": "test@example.com", "password": "1234" }
```

### Response
```json
{
  "user": { "id": 1, "email": "test@example.com", "nickname": "tester" },
  "accessToken": "jwt...",
  "refreshToken": "jwt..."
}
```

### Known Errors
- `UnauthorizedError(401)`: Invalid credentials
- `ValidationError`: 요청 Body 검증 실패
- `InternalServerError`

---

## POST /auth/refresh
토큰 재발급

### Request
```json
{ "refreshToken": "jwt..." }
```

### Response
```json
{
  "user": { "id": 1, "email": "test@example.com", "nickname": "tester" },
  "accessToken": "newJwt...",
  "refreshToken": "newJwt..."
}
```

### Known Errors
- `UnauthorizedError(401)`: Invalid refresh token / Refresh token mismatch
- `NotFoundError(404)`: User not found
- `ValidationError`
- `InternalServerError`

---

## POST /auth/logout
로그아웃

### Request
Header: `Authorization: Bearer {accessToken}`

### Response
`204 No Content`

### Known Errors
- `UnauthorizedError(401)`: 토큰 없음/유효하지 않음
- `NotFoundError(404)`: User not found
- `InternalServerError`
