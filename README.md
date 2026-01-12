# Food App - Ứng dụng Quản lý Địa điểm Đi chơi

Ứng dụng web quản lý địa điểm đi chơi với đầy đủ chức năng CRUD, random địa điểm, và quản lý lịch đi chơi.

## 🎯 Tính năng

### Quản lý địa điểm đi chơi
- ✅ Thêm, xóa, sửa các địa điểm
- ✅ Tìm kiếm địa điểm theo tên
- ✅ Lọc địa điểm theo loại

### Quản lý loại địa điểm
- ✅ Thêm, xóa, sửa các loại địa điểm
- ✅ Icon/Emoji cho mỗi loại

### Quản lý lịch đi chơi
- ✅ Thêm, xóa, sửa lịch đi chơi
- ✅ Chọn địa điểm từ danh sách hoặc random
- ✅ Thời gian cụ thể (bắt đầu và kết thúc)
- ✅ Ghi chú và đánh giá (bình luận + điểm 0-10)
- ✅ Lưu ảnh về chuyến đi

### Random địa điểm
- ✅ Random một hoặc nhiều địa điểm
- ✅ Tìm kiếm theo tên trước khi random
- ✅ Lọc theo loại địa điểm trước khi random

## 🛠️ Công nghệ

### Frontend
- Vue.js 3
- Vue Router
- Pinia
- Axios
- Vite

### Backend
- Java 17
- Spring Boot 3.2.0
- Maven
- Lombok

### Database
- Mockdata (in-memory)

## 📁 Cấu trúc dự án

```
Food/
├── BE/                 # Backend (Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/food/app/
│   │       │       ├── config/
│   │       │       ├── controller/
│   │       │       ├── model/
│   │       │       ├── repository/
│   │       │       └── service/
│   │       └── resources/
│   └── pom.xml
├── Fe/                 # Frontend (Vue.js)
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   ├── services/
│   │   └── App.vue
│   ├── package.json
│   └── vite.config.js
└── feature.md          # Tài liệu yêu cầu
```

## 🚀 Cài đặt và chạy

### Backend

```bash
cd BE
mvn clean install
mvn spring-boot:run
```

Backend chạy tại: `http://localhost:8080`

### Frontend

```bash
cd Fe
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:3000`

## 📦 Deploy

### Frontend - Vercel (Khuyến nghị)

1. Cài đặt Vercel CLI: `npm i -g vercel`
2. Đăng nhập: `vercel login`
3. Deploy: `vercel`
4. Cấu hình biến môi trường `VITE_API_BASE_URL` trỏ đến backend URL

### Backend - Render (Khuyến nghị)

1. Kết nối repository với Render
2. Chọn "Web Service"
3. Build command: `mvn clean install -DskipTests`
4. Start command: `java -jar target/food-app-1.0.0.jar`
5. Cấu hình PORT environment variable

**Lưu ý**: 
- Render có free tier nhưng có giới hạn (sleep sau 15 phút không hoạt động)
- Vercel rất tốt cho frontend, miễn phí và không có giới hạn sleep
- Để sử dụng lâu dài, có thể cân nhắc upgrade Render hoặc dùng các dịch vụ khác như Railway, Fly.io

## 🎨 UI/UX

- Màu sắc tươi sáng, hài hòa
- Giao diện hiện đại, dễ sử dụng
- Responsive design
- Animations và transitions mượt mà

## 📝 API Documentation

Xem chi tiết trong `BE/README.md`

## 👨‍💻 Phát triển

### Thêm tính năng mới

1. Backend: Thêm model → repository → service → controller
2. Frontend: Thêm API service → view/component → route

### Mockdata

Hiện tại sử dụng in-memory mockdata. Để chuyển sang database thật:
1. Thêm Spring Data JPA dependency
2. Tạo entities với JPA annotations
3. Thay repository mock bằng JPA repositories
4. Cấu hình database connection

## 📄 License

MIT


