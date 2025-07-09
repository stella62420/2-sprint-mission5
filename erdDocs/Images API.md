# 🖼 Images API

이미지 업로드 API를 제공합니다.

---

## POST /images/upload

- Form-Data:
  - `image`: (파일 업로드)

- 응답 예시:
```json
{
  "url": "http://localhost:3000/public/image.jpg"
}
```

- 오류 예시:
```json
{
  "message": "Only png, jpeg, and jpg are allowed"
}
```
