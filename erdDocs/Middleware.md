# 🧱 Middleware 정리

프로젝트 전반에 사용되는 공통 미들웨어입니다.

---

## 🔐 authenticateUser

- JWT Access Token을 검증하여 `req.user`에 사용자 정보 삽입
- 실패 시 401 Unauthorized 에러 반환

## 🔐 optionalAuthenticateUser

- 토큰이 있어도 되고 없어도 되는 인증 미들웨어
- 있으면 `req.user`에 삽입, 없으면 넘어감

## 🧪 validate(type, struct)

- 요청의 `body`, `params`, `query`를 Superstruct로 유효성 검사
- 예시:
```ts
validate('body', LoginBodyStruct)
```

## 🛠 withAsync(handler)

- 비동기 핸들러에서 try/catch 대신 사용하는 wrapper 함수
- 에러 발생 시 `next(error)`로 넘김
