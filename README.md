# 코드잇 백엔드 - Sprint 5 미션

---

## ✅ 미션 목표

- [x] 타입스크립트 마이그레이션
- [x] 타입스크립트 개발 환경 세팅
- [ ] (심화) Layered Architecture 적용

---

## 📌 기본 요구 사항

- [x] `tsconfig.json` 설정 완료 (`strict`, `outDir`, `baseUrl`, `paths` 포함)
- [x] `npm run dev`, `npm run build`, `npm start` 스크립트 구성
- [x] 타입 패키지 설치 및 `any` 최소화
- [x] 필요한 유틸리티 타입 / 인터페이스 정의 사용
- [x] `declare global`로 req.user 타입 확장

---

## ⚙ 개발 환경 설정

- [x] `ts-node`, `nodemon` 활용한 개발환경 구성 (`npm run dev`)
- [x] `.env` 파일 기반 설정 (`dotenv` 적용)
- [x] 개발 시 TypeScript 변경사항 실시간 반영

---

## 🔁 타입스크립트 마이그레이션

- [x] JS → TS로 전체 파일 변환 완료
- [x] `superstruct`로 유효성 검증
- [x] 사용자 정의 타입과 유틸리티 타입 적극 사용
- [x] `req.user` 타입 확장 처리 (`declare global`)

---

## 🧱 심화 요구 사항

### Layered Architecture

- [ ] Controller, Service, Repository 계층 분리: ❌ 아직 미적용
- [ ] DTO 정의 및 계층 간 데이터 전달 구조화: ❌ 미적용

---

## ✅ 구현된 도메인

- [x] 상품 등록, 조회, 수정, 삭제, 목록 검색 (offset 기반 페이지네이션, 최신순 정렬)
- [x] 게시글 등록, 조회, 수정, 삭제, 목록 검색 (offset, 정렬 포함)
- [x] 댓글 (게시글/상품) 등록, 조회, 수정, 삭제 (cursor 페이지네이션)
- [x] 이미지 업로드 (multer + 파일 제한 처리)
- [x] 유효성 검증 (`superstruct`)
- [x] 공통 에러 핸들링 및 상태 코드 적용
- [x] 라우터 모듈화 및 중복 제거 (`express.Router`, `app.route()`)

---

## 🔧 주요 변경사항

- [x] JS → TS로 마이그레이션
- [x] `tags` 필드를 문자열 → 배열로 개선
- [x] 비즈니스 로직 보완: 예시 `favorite()` 내 추천 수 증가 등

---

## 🖼 스크린샷


---

## 🙋 멘토에게


