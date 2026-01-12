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

**Bạn có thể deploy cả FE và BE từ cùng một repository (monorepo), nhưng phải deploy riêng biệt trên các platform phù hợp.**

### 🎯 Tổng quan

- **Frontend (FE)**: Deploy lên **Vercel** (Static Site)
- **Backend (BE)**: Deploy lên **Render** (Web Service)

### Bước 1: Deploy Backend lên Render

1. Truy cập [render.com](https://render.com) và đăng nhập bằng GitHub
2. Click **"New +"** → **"Web Service"**
3. Kết nối repository của bạn (cùng repo chứa cả FE và BE)
4. **Cấu hình quan trọng**:
   - **Root Directory**: `BE` ⚠️ **QUAN TRỌNG - Phải set đúng**
   - **Environment**: `Java`
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/food-app-1.0.0.jar`
5. Click **"Create Web Service"**
6. **Đợi deploy xong** → Copy URL backend (ví dụ: `https://food-app-backend.onrender.com`)

**Lưu ý**: File `BE/render.yaml` đã có sẵn, Render sẽ tự động detect.

### Bước 2: Deploy Frontend lên Vercel

1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub
2. Click **"Add New Project"**
3. Import **cùng repository** với backend
4. **Cấu hình quan trọng**:
   - **Root Directory**: `Fe` ⚠️ **QUAN TRỌNG - Phải set đúng**
   - **Framework Preset**: Vite (tự động detect)
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `dist` (tự động)
5. **Thêm Environment Variable**:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://food-app-backend.onrender.com/api` (URL từ Bước 1 + `/api`)
6. Click **"Deploy"**
7. **Đợi deploy xong** → Copy URL frontend

### Bước 3: Cấu hình CORS (Đã có sẵn ✅)

Backend đã được cấu hình CORS để cho phép tất cả origins. Nếu muốn giới hạn, sửa file `BE/src/main/java/com/food/app/config/CorsConfig.java`.

### ✅ Sau khi deploy

- Mỗi khi push code lên GitHub:
  - Render tự động redeploy backend (nếu có thay đổi trong `BE/`)
  - Vercel tự động redeploy frontend (nếu có thay đổi trong `Fe/`)

**Lưu ý**: 
- Render có free tier nhưng có giới hạn (sleep sau 15 phút không hoạt động)
- Vercel rất tốt cho frontend, miễn phí và không có giới hạn sleep
- Xem hướng dẫn chi tiết trong `DEPLOY_FULL.md`

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


