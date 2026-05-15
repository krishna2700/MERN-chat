# 풀스택 상품 스토어

MongoDB, Express, React, Node.js(MERN)를 사용한 완전한 CRUD 기능을 갖춘 풀스택 상품 스토어 애플리케이션입니다. MongoDB로 구동되는 REST API를 통해 상품을 생성, 조회, 수정, 삭제할 수 있습니다.

## 라이브 데모

[https://full-stack-project-deployment-product.onrender.com/](https://full-stack-project-deployment-product.onrender.com/)

## 기술 스택

- **프론트엔드:** React, Vite
- **백엔드:** Node.js, Express.js
- **데이터베이스:** MongoDB (Mongoose ODM)
- **배포:** Render.com

## 프로젝트 구조

```
├── backend/
│   ├── config/       # 데이터베이스 연결
│   ├── controllers/  # 라우트 로직
│   ├── models/       # Mongoose 스키마
│   ├── routes/       # API 라우트
│   └── server.js     # 진입점
├── frontend/         # React 애플리케이션
└── package.json
```

## 시작하기

### 사전 요구사항

- Node.js v18 이상
- MongoDB Atlas 계정 (또는 로컬 MongoDB)

### 설치

```bash
# 저장소 클론
git clone https://github.com/krishna2700/Full-Stack-Project-Deployment--Product-Store.git
cd Full-Stack-Project-Deployment--Product-Store

# 의존성 설치
npm install

# 환경 변수 설정
# 루트 디렉토리에 .env 파일을 생성하고 다음 내용 추가:
# MONGO_URI=mongodb_연결_문자열
# PORT=5000

# 개발 모드 실행
npm run dev
```

## API 엔드포인트

| 메서드 | 엔드포인트         | 설명              |
|--------|--------------------|-------------------|
| GET    | /api/products      | 전체 상품 조회    |
| POST   | /api/products      | 상품 생성         |
| PUT    | /api/products/:id  | 상품 수정         |
| DELETE | /api/products/:id  | 상품 삭제         |

## 라이센스

MIT
