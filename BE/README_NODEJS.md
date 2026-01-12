# Food App Backend - Node.js

Backend API đã được chuyển đổi từ Java Spring Boot sang Node.js/Express.

## 🚀 Cài đặt và chạy

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Cài đặt dependencies
```bash
cd BE
npm install
```

### Chạy development
```bash
npm run dev
```

### Chạy production
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:8080`

## 📦 Cấu trúc

```
BE/
├── server.js                    # Entry point
├── package.json                 # Dependencies
├── models/                      # Data models
│   ├── Location.js
│   ├── LocationType.js
│   └── TripSchedule.js
├── repositories/                # Data access layer (mockdata)
│   ├── LocationRepository.js
│   ├── LocationTypeRepository.js
│   └── TripScheduleRepository.js
├── services/                    # Business logic
│   ├── LocationService.js
│   ├── LocationTypeService.js
│   └── TripScheduleService.js
└── routes/                      # API routes
    ├── locationRoutes.js
    ├── locationTypeRoutes.js
    └── tripScheduleRoutes.js
```

## 📡 API Endpoints

Giữ nguyên tất cả API endpoints như backend Java:

### Location Types
- `GET /api/location-types` - Lấy danh sách
- `GET /api/location-types/:id` - Lấy theo ID
- `POST /api/location-types` - Tạo mới
- `PUT /api/location-types/:id` - Cập nhật
- `DELETE /api/location-types/:id` - Xóa

### Locations
- `GET /api/locations` - Lấy danh sách
- `GET /api/locations/:id` - Lấy theo ID
- `POST /api/locations` - Tạo mới
- `PUT /api/locations/:id` - Cập nhật
- `DELETE /api/locations/:id` - Xóa
- `GET /api/locations/search?name=...` - Tìm kiếm
- `GET /api/locations/filter?typeId=...` - Lọc theo loại
- `GET /api/locations/random` - Random một địa điểm
- `GET /api/locations/random/:count` - Random nhiều địa điểm

### Trip Schedules
- `GET /api/trip-schedules` - Lấy danh sách
- `GET /api/trip-schedules/:id` - Lấy theo ID
- `POST /api/trip-schedules` - Tạo mới
- `PUT /api/trip-schedules/:id` - Cập nhật
- `DELETE /api/trip-schedules/:id` - Xóa

## 🚀 Deploy lên Render

### Bước 1: Cấu hình trên Render
1. Tạo **Web Service** mới
2. Kết nối repository
3. Cấu hình:
   - **Root Directory**: `BE`
   - **Environment**: `Node`
   - **Build Command**: `npm install` (hoặc để trống)
   - **Start Command**: `npm start`

### Bước 2: Environment Variables
- `PORT`: Render tự động set, không cần thêm

### Bước 3: Deploy
Click "Create Web Service" và đợi deploy xong.

## ✅ Lợi ích

- ✅ Dễ deploy trên Render (hỗ trợ Node.js tốt)
- ✅ Giữ nguyên API endpoints → Frontend không cần thay đổi
- ✅ Code đơn giản, dễ maintain
- ✅ Tương thích với tất cả platform hỗ trợ Node.js

## 📝 Lưu ý

- Backend vẫn sử dụng mockdata (in-memory)
- Để chuyển sang database, có thể thêm MongoDB, PostgreSQL, etc.
- CORS đã được cấu hình để cho phép tất cả origins

