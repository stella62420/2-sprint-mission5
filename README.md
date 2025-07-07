## 요구사항
[x] 공통
  [x] PostgreSQL를 이용해 주세요.
    🔎PostgreSQL 데이터베이스 사용

  [x] 데이터 모델 간의 관계를 고려하여 onDelete를 설정해 주세요.
    🔎데이터 모델 간의 관계를 고려한 `onDelete` 설정

  [x] 데이터베이스 시딩 코드를 작성해 주세요.
    🔎 Prisma `seed.ts` 파일을 통해 초기 데이터를 삽입하도록 함

  [x] 각 API에 적절한 에러 처리를 해 주세요.
    🔎 각 라우터 핸들러 내에 `try...catch` 블록을 사용하여 예상치 못한 오류를 처리하도록 함

  [x] 각 API 응답에 적절한 상태 코드를 리턴하도록 해 주세요.
    🔎 `res.status()` 메서드를 사용하여 성공 시 `200 OK`, `201 Created`, `204 No Content` 등을, 클라이언트 오류 시 `400 Bad Request`, `404 Not Found` 등을, 서버 오류 시 `500 Internal Server Error` 등 반환하도록 함

[x] 중고마켓
  [x] Product 스키마를 작성해 주세요.
     - id, name, description, price, tags, createdAt, updatedAt필드를 가집니다.
     - 필요한 필드가 있다면 자유롭게 추가해 주세요.
  [x] 상품 등록 API를 만들어 주세요.
     - name, description, price, tags를 입력하여 상품을 등록합니다.
  [x] 상품 상세 조회 API를 만들어 주세요.
     - id, name, description, price, tags, createdAt를 조회합니다.
  [x] 상품 수정 API를 만들어 주세요.
     - PATCH 메서드를 사용해 주세요.
  [x] 상품 삭제 API를 만들어 주세요.
  [x] 상품 목록 조회 API를 만들어 주세요.
     - id, name, price, createdAt를 조회합니다.
     - offset 방식의 페이지네이션 기능을 포함해 주세요.
     - 최신순(recent)으로 정렬할 수 있습니다.
     - name, description에 포함된 단어로 검색할 수 있습니다.
  [x] 각 API에 적절한 에러 처리를 해 주세요.
  [x] 각 API 응답에 적절한 상태 코드를 리턴하도록 해 주세요.

[x] 자유게시판
  [x] Article 스키마를 작성해 주세요.
     - id, title, content, createdAt, updatedAt 필드를 가집니다.
  [x] 게시글 등록 API를 만들어 주세요.
     - title, content를 입력해 게시글을 등록합니다.
  [x] 게시글 상세 조회 API를 만들어 주세요.
     - id, title, content, createdAt를 조회합니다.
  [x] 게시글 수정 API를 만들어 주세요.
  [x] 게시글 삭제 API를 만들어 주세요.
  [x] 게시글 목록 조회 API를 만들어 주세요.
     - id, title, content, createdAt를 조회합니다.
     - offset 방식의 페이지네이션 기능을 포함해 주세요.
     - 최신순(recent)으로 정렬할 수 있습니다.
     - title, content에 포함된 단어로 검색할 수 있습니다.

[x] 댓글
  [x] 댓글 등록 API를 만들어 주세요.
     - content를 입력하여 댓글을 등록합니다.
     - 중고마켓, 자유게시판 댓글 등록 API를 따로 만들어 주세요.
  [x] 댓글 수정 API를 만들어 주세요.
     - PATCH 메서드를 사용해 주세요.
  [x] 댓글 삭제 API를 만들어 주세요.
  [x] 댓글 목록 조회 API를 만들어 주세요.
     - id, content, createdAt 를 조회합니다.
     - cursor 방식의 페이지네이션 기능을 포함해 주세요.
     - 중고마켓, 자유게시판 댓글 목록 조회 API를 따로 만들어 주세요.

[x] 유효성 검증
  [x] 상품 등록 시 필요한 필드(이름, 설명, 가격 등)의 유효성을 검증하는 미들웨어를 구현합니다.
  [x] 게시물 등록 시 필요한 필드(제목, 내용 등)의 유효성 검증하는 미들웨어를 구현합니다.
  [x] multer 미들웨어를 사용하여 이미지 업로드 API를 구현해주세요.
     - 업로드된 이미지는 서버에 저장하고, 해당 이미지의 경로를 response 객체에 포함해 반환합니다.

[x] 이미지 업로드
  [x] multer 미들웨어를 사용하여 이미지 업로드 API를 구현해주세요.
     - 업로드된 이미지는 서버에 저장하고, 해당 이미지의 경로를 response 객체에 포함해 반환합니다.

[x] 에러 처리
  [x] 모든 예외 상황을 처리할 수 있는 에러 핸들러 미들웨어를 구현합니다.
  [x] 서버 오류(500), 사용자 입력 오류(400 시리즈), 리소스 찾을 수 없음(404) 등 상황에 맞는 상태값을 반환합니다.

[x] 라우트 중복 제거
  [x] 중복되는 라우트 경로(예: /users에 대한 get 및 post 요청)를 app.route()로 통합해 중복을 제거합니다.
  [x] express.Router()를 활용하여 중고마켓/자유게시판 관련 라우트를 별도의 모듈로 구분합니다.


### 기본 

위에서 설명된 모든 요구사항들을 Express, Prisma, Superstruct, Multer 등 표준 기술 스택을 사용하여 구현했습니다. 

### 심화 


### 주요 변경사항
[x] 1,2차 과제 후 리뷰 수정
  - setter 사용 후 명시적인 초기값 설정
  - favorite()호출 시 1씩 증가, this.favoriteCount ++;을 추가 가전제품의   추천제품 추가하여 의미 차이를 명확하게 함
  - likeconunt → likeCount 오타 수정
  - tags 필드 문자열에서 배열 요소로 변경

 ## 스크린샷

 ## 멘토에게