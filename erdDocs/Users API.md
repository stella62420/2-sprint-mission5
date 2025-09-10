# 👤 Users API

## GET /users/me
내 정보 조회

### Request
Header: `Authorization: Bearer {accessToken}`

### Response
```json
{ "id": 1, "email": "test@example.com", "nickname": "tester", "image": null }
```

### Known Errors
- `UnauthorizedError(401)`: 인증 실패
- `InternalServerError`

---

## PATCH /users/password
비밀번호 변경

### Request
```json
{ "oldPassword": "1234", "newPassword": "abcd" }
```

### Response
`204 No Content`

### Known Errors
- `UnauthorizedError(401)`: 인증 실패
- `ForbiddenError(403)`: 현재 비밀번호 불일치 등 정책 위반
- `ValidationError`
- `InternalServerError`
