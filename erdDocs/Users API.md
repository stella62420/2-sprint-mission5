# 👤 Users API

(예시용) 사용자 관련 API 문서입니다.  
실제로 구현된 기능에 따라 내용은 추가/수정 가능합니다.

---

## GET /users/me

내 정보 조회 (인증 필요)

- 응답 예시:
```json
{
  "id": 1,
  "email": "user@example.com",
  "nickname": "usernick"
}
```

## PATCH /users/password

비밀번호 변경 (인증 필요)

- Body:
```json
{
  "oldPassword": "oldpass123",
  "newPassword": "newpass456"
}
```

- 응답:
```json
{
  "message": "Password changed successfully"
}
```

- 오류 예시:
```json
{
  "message": "Old password does not match"
}
```

> ⚠️ 실제 구현된 API가 다르면 반영해 주세요.
