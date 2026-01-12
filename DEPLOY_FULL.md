# 🚀 Hướng dẫn Deploy Cả FE và BE từ Cùng Một Repo

## 📋 Tổng quan

Bạn có thể deploy cả **Frontend (FE)** và **Backend (BE)** từ cùng một repository (monorepo), nhưng chúng phải được deploy **riêng biệt** trên các platform phù hợp:

- **Frontend (Vue.js)**: Deploy lên **Vercel** hoặc **Netlify** (Static Site)
- **Backend (Spring Boot)**: Deploy lên **Render** hoặc **Railway** (Web Service)

## 🎯 Tại sao phải deploy riêng?

- **FE và BE là 2 ứng dụng khác nhau**: 
  - FE: Vue.js + Vite → Cần build thành static files
  - BE: Java + Spring Boot → Cần chạy JAR file trên server
  
- **Khác platform phù hợp**:
  - FE: Static hosting (Vercel, Netlify)
  - BE: Application hosting (Render, Railway)

- **Khác build process**:
  - FE: `npm run build` → tạo thư mục `dist`
  - BE: `mvn clean install` → tạo file `jar`

## 📦 Cấu trúc Repo

```
Food/
├── BE/                    # Backend (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   └── render.yaml        # Cấu hình Render cho BE
├── Fe/                    # Frontend (Vue.js)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── vercel.json            # Cấu hình Vercel cho FE
```

## 🚀 Các bước Deploy

### Bước 1: Deploy Backend (BE) lên Render

1. **Truy cập Render**: https://render.com
2. **Đăng nhập** bằng GitHub
3. **Click "New +"** → **"Web Service"**
4. **Kết nối repository** của bạn
5. **Cấu hình**:
   - **Name**: `food-app-backend`
   - **Environment**: `Java`
   - **Branch**: `main` (hoặc branch của bạn)
   - **Root Directory**: `BE` ⚠️ **QUAN TRỌNG**
   - **Build Command**: `mvn clean install -DskipTests`
   - **Start Command**: `java -jar target/food-app-1.0.0.jar`
6. **Environment Variables**:
   - `PORT`: `8080` (Render tự động set, nhưng có thể thêm để chắc chắn)
7. **Click "Create Web Service"**
8. **Đợi deploy xong** → Copy URL backend (ví dụ: `https://food-app-backend.onrender.com`)

**Hoặc dùng file `render.yaml`** (đã có sẵn):
- Render sẽ tự động detect file `BE/render.yaml`
- Chỉ cần chỉnh **Root Directory** thành `BE`

### Bước 2: Deploy Frontend (FE) lên Vercel

1. **Truy cập Vercel**: https://vercel.com
2. **Đăng nhập** bằng GitHub
3. **Click "Add New Project"**
4. **Import repository** của bạn (cùng repo với BE)
5. **Cấu hình**:
   - **Root Directory**: `Fe` ⚠️ **QUAN TRỌNG**
   - **Framework Preset**: Vite (tự động detect)
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `dist` (tự động)
6. **Environment Variables**:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://food-app-backend.onrender.com/api` (URL từ Bước 1 + `/api`)
7. **Click "Deploy"**
8. **Đợi deploy xong** → Copy URL frontend

### Bước 3: Cấu hình CORS ở Backend

Đảm bảo backend cho phép frontend domain. Kiểm tra file `BE/src/main/java/com/food/app/config/CorsConfig.java`:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "http://localhost:3000",  // Local dev
                        "https://your-frontend.vercel.app"  // Production - thay bằng URL Vercel của bạn
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

**Hoặc cho phép tất cả** (chỉ dùng cho development):
```java
.allowedOrigins("*")
```

### Bước 4: Kiểm tra

1. **Truy cập URL frontend** đã deploy
2. **Mở Console** (F12) → Network tab
3. **Kiểm tra API calls** có thành công không
4. **Test các chức năng**: Load data, tạo mới, sửa, xóa

## 🔄 Workflow Deploy Tự Động

Sau khi setup xong, mỗi khi bạn push code lên GitHub:

- **Render** sẽ tự động detect thay đổi trong `BE/` và redeploy backend
- **Vercel** sẽ tự động detect thay đổi trong `Fe/` và redeploy frontend

## 📝 Lưu ý Quan Trọng

### 1. Root Directory
- **Render (BE)**: Phải set `Root Directory = BE`
- **Vercel (FE)**: Phải set `Root Directory = Fe`

### 2. Environment Variables
- **Backend**: Không cần `VITE_API_BASE_URL` (chỉ FE cần)
- **Frontend**: Cần `VITE_API_BASE_URL` trỏ đến URL backend

### 3. CORS Configuration
- Backend phải cho phép domain frontend
- Cập nhật `CorsConfig.java` với URL frontend production

### 4. Build Commands
- **Backend**: `mvn clean install -DskipTests` (chạy từ thư mục `BE/`)
- **Frontend**: `npm run build` (chạy từ thư mục `Fe/`)

## 🎯 Tóm tắt Nhanh

```
1. Deploy BE lên Render
   └─> Lấy URL: https://food-app-backend.onrender.com

2. Deploy FE lên Vercel
   └─> Set VITE_API_BASE_URL = https://food-app-backend.onrender.com/api

3. Cấu hình CORS ở BE
   └─> Cho phép domain Vercel của FE

4. Done! ✅
```

## 🔧 Troubleshooting

### Backend không chạy được
- Kiểm tra Root Directory = `BE`
- Kiểm tra Build Command và Start Command
- Xem logs trong Render dashboard

### Frontend không kết nối được API
- Kiểm tra `VITE_API_BASE_URL` đã đúng chưa
- Kiểm tra CORS config ở backend
- Kiểm tra backend có đang chạy không (Render có thể sleep sau 15 phút)

### Build failed
- Kiểm tra Root Directory đúng chưa
- Kiểm tra build command chạy được local không
- Xem logs chi tiết trong dashboard

