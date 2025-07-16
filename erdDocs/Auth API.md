# 🔐 Auth API

JWT 기반 사용자 인증 기능을 제공합니다.

---

## POST /auth/register

회원가입

- Body:
```json
{
  "email": "example@email.com",
  "nickname": "nickname",
  "password": "password123"
}
```

- 성공 응답:
```json
{
  "message": "Registration successful",
  "accessToken": "access_token_here",
  "refreshToken": "refresh_token_here"
}
```

- 오류 예시:
```json
{
  "message": "Email already exists."
}
```

---

## POST /auth/login

로그인 (access + refresh token 발급)

- Body:
```json
{
  "email": "example@email.com",
  "password": "password123"
}
```

- 성공 응답:
```json
{
  "message": "Login successful",
  "accessToken": "access_token_here",
  "refreshToken": "refresh_token_here"
}
```

- 오류 예시:
```json
{
  "message": "Invalid email or password."
}
```

---

## POST /auth/refresh

리프레시 토큰으로 access 토큰 재발급

- Body:
```json
{
  "refreshToken": "your_refresh_token"
}
```

- 성공 응답:
```json
{
  "accessToken": "new_access_token"
}
```

- 오류 예시:
```json
{
  "message": "Invalid or expired Refresh Token."
}
```
