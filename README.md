**TruyenCo Desktop + API**
- Ứng dụng đọc truyện chữ chạy Windows & Linux (Electron + React + Redux Toolkit + TailwindCSS + dayjs + axios + yup)
- Backend API NestJS + Swagger

**Cấu Trúc**
- `api/`: NestJS API (Postgres + TypeORM). Swagger: `http://localhost:3003/swagger` (dev) hoặc `http://localhost:3000/swagger` (docker-compose).
- `desktop/`: Electron + React renderer.

**Yêu Cầu**
- Node.js >= 18
- PostgreSQL + Redis (có sẵn docker-compose trong `api/`)

**Tài Khoản Mặc Định**
- username: `nathan`
- password: `password`

API khi khởi động sẽ tự tạo tài khoản trên nếu chưa tồn tại.

**Chạy Nhanh Bằng Docker (API)**
1) `cd api`
2) `docker compose up -d`
- API: http://localhost:3000 (Swagger: http://localhost:3000/swagger)

**Chạy API Cục Bộ (Không Docker)**
1) Tạo Postgres DB theo `api/.env` (mặc định: `truyenco` port `5432`).
2) `cd api && npm i`
3) `npm run start:dev`
- API: http://localhost:3003 (Swagger: http://localhost:3003/swagger)

Các endpoint chính:
- `POST /api/auth/login` (username, password) -> trả accessToken
- `POST /api/auth/register` (username, password)
- `GET /api/stories` (Danh sách truyện)
- `GET /api/stories/:id` (Chi tiết + danh sách chương)
- `GET /api/stories/:id/chapters/:number` (Nội dung chương)
- `POST /api/stories` (tạo truyện) [Bearer]
- `POST /api/stories/:id/chapters` (tạo chương) [Bearer]

Gợi ý seed nhanh (qua Swagger):
1) `POST /api/stories` -> lấy `id`
2) `POST /api/stories/:id/chapters` với `number` 1..N, `content`.

**Chạy Desktop**
1) `cd desktop && npm i`
2) Dev: `npm run dev` (Vite `http://localhost:5173`, Electron mở app tự động)
3) Đổi API URL nếu cần: tạo file `desktop/.env` với `VITE_API_URL=http://localhost:3003/api`
4) Đóng gói: `npm run dist` (tạo installer cho Windows/Linux)

Ghi chú:
- Desktop mặc định gọi `http://localhost:3003/api` (đổi qua `VITE_API_URL`).
- Modal trong trang Danh sách được lazy load (code-splitting) và unmount khi đóng.

**Trang Chức Năng**
- Sign In / Sign Up
- Danh sách truyện
- Chi tiết truyện + danh sách chương
- Đọc từng chương (nút trước/sau)

