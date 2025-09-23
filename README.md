# Panda Market API

## 환경 변수 설정
`.env.example` 파일을 참고해서 `.env`와 `.env.test`에 필요한 환경 변수를 설정해 주세요.

## 설치

의존성 패키지를 설치합니다.

```
npm install
```

Prisma와 데이터베이스를 준비합니다.
```
npx prisma generate
npx prisma migrate dev
```

## 실행

`npm dev`로 개발 모드로 실행할 수 있습니다.

## 스프린트 미션 11 관련 설명

### Github Actions

- `test.yaml`
  - Github actions에서 제공하는 Postgres를 사용해서 테스트를 진행합니다.
- `deploy.yaml`
  - SSH로 접속해 AWS EC2에 배포합니다.
  - 이때 EC2 접속에 쓰는 키페어를 환경 변수인 `EC2_PEM_KEY`에 설정하고 public IP를 환경 변수 `EC2_HOST`에 설정해야 합니다.
  - 코드의 `/panda-market`은 EC2 안에 있는 git repo 경로입니다.
  - `start.sh` 파일을 만들어서 pm2를 실행하도록 했습니다. 여기서 사용한 `#!/bin/bash`의 의미는 "Shebang"을 찾아보세요!

### Docker

- `Dockerfile`과 `docker-compose.yaml` 파일을 참고해 주세요.
- 이 프로젝트에서는 bcrypt 패키지를 사용하고 있어서, 빌드에 필요한 도구들을 설치하는 코드가 `Dockerfile`에 있습니다.
- `COPY --from=build /app/{package*.json,node_modules,build,prisma} ./`에서 사용한 `{ ... }` 문법은 "Brace Expansion" 문법을 찾아 보세요!