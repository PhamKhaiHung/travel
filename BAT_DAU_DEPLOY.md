# 🚀 Bắt Đầu Deploy - Checklist Từng Bước

## ✅ Bước 0: Chuẩn bị (Làm trước khi deploy)

### 0.1. Kiểm tra code đã sẵn sàng

```bash
# Kiểm tra backend build được không
cd BE
mvn clean install -DskipTests
# Nếu thành công → có file target/food-app-1.0.0.jar

# Kiểm tra frontend build được không  
cd ../Fe
npm run build
# Nếu thành công → có thư mục dist/
```

### 0.2. Đảm bảo code đã commit và push lên GitHub

```bash
# Từ thư mục gốc Food/
git status
# Kiểm tra xem có file nào chưa commit không

# Nếu có file mới/chưa commit:
git add .
git commit -m "Prepare for deployment"
git push
```

**⚠️ QUAN TRỌNG**: Code phải có trên GitHub thì mới deploy được!

---

## 🎯 Bước 1: Deploy Backend lên Render (Làm trước)

### 1.1. Truy cập Render
- Mở trình duyệt: https://render.com
- Click **"Get Started for Free"** hoặc **"Sign In"**
- Đăng nhập bằng **GitHub** (khuyến nghị)

### 1.2. Tạo Web Service mới
1. Click nút **"New +"** (góc trên bên phải)
2. Chọn **"Web Service"**

### 1.3. Kết nối Repository
1. Click **"Connect account"** nếu chưa kết nối GitHub
2. Chọn repository của bạn (repo chứa cả FE và BE)
3. Click **"Connect"**

### 1.4. Cấu hình Backend
Điền các thông tin sau:

| Trường | Giá trị |
|--------|---------|
| **Name** | `food-app-backend` |
| **Region** | `Singapore` (hoặc gần nhất) |
| **Branch** | `main` (hoặc branch của bạn) |
| **Root Directory** | `BE` ⚠️ **QUAN TRỌNG** |
| **Runtime** | `Java` |
| **Build Command** | `mvn clean install -DskipTests` |
| **Start Command** | `java -jar target/food-app-1.0.0.jar` |

### 1.5. Environment Variables (Tùy chọn)
- Render tự động set PORT, không cần thêm
- Nếu cần, có thể thêm:
  - `PORT` = `8080`
  - `JAVA_OPTS` = `-Xmx512m -Xms256m`

### 1.6. Deploy
1. Click **"Create Web Service"**
2. Đợi 5-10 phút để build và deploy
3. Khi thấy status **"Live"** → **Copy URL backend**
   - Ví dụ: `https://food-app-backend-abc123.onrender.com`
   - **Lưu URL này lại, cần dùng ở Bước 2!**

### 1.7. Kiểm tra Backend
- Mở URL backend trong browser
- Nếu thấy lỗi 404 hoặc trang trắng → **Bình thường** (backend không có trang chủ)
- Test API: `https://your-backend.onrender.com/api/locations`
- Nếu thấy JSON data → ✅ **Backend đã hoạt động!**

---

## 🎯 Bước 2: Deploy Frontend lên Vercel

### 2.1. Truy cập Vercel
- Mở trình duyệt: https://vercel.com
- Click **"Sign Up"** hoặc **"Log In"**
- Đăng nhập bằng **GitHub**

### 2.2. Tạo Project mới
1. Click **"Add New..."** → **"Project"**
2. Hoặc click **"Add New Project"**

### 2.3. Import Repository
1. Tìm và chọn **cùng repository** với backend
2. Click **"Import"**

### 2.4. Cấu hình Frontend
Điền các thông tin sau:

| Trường | Giá trị |
|--------|---------|
| **Project Name** | `food-app-frontend` (hoặc để mặc định) |
| **Framework Preset** | `Vite` (tự động detect) |
| **Root Directory** | `Fe` ⚠️ **QUAN TRỌNG** |
| **Build Command** | `npm run build` (tự động) |
| **Output Directory** | `dist` (tự động) |
| **Install Command** | `npm install` (tự động) |

### 2.5. Environment Variables (QUAN TRỌNG!)
1. Click **"Environment Variables"** để mở rộng
2. Click **"Add"** để thêm biến mới:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://food-app-backend-abc123.onrender.com/api`
     - ⚠️ Thay `food-app-backend-abc123` bằng URL backend thực tế từ Bước 1.6
     - ⚠️ Nhớ thêm `/api` ở cuối!
   - **Environment**: Chọn cả 3 (Production, Preview, Development)
3. Click **"Save"**

### 2.6. Deploy
1. Click **"Deploy"**
2. Đợi 2-5 phút để build và deploy
3. Khi thấy **"Ready"** → **Copy URL frontend**
   - Ví dụ: `https://food-app-frontend.vercel.app`

### 2.7. Kiểm tra Frontend
- Mở URL frontend trong browser
- Nếu thấy giao diện ứng dụng → ✅ **Frontend đã hoạt động!**
- Mở **Console** (F12) → **Network tab**
- Kiểm tra API calls có thành công không

---

## ✅ Bước 3: Kiểm tra và Test

### 3.1. Test các chức năng
1. **Load danh sách địa điểm** → Xem có data không
2. **Tạo địa điểm mới** → Xem có lưu được không
3. **Sửa địa điểm** → Xem có cập nhật được không
4. **Xóa địa điểm** → Xem có xóa được không

### 3.2. Nếu có lỗi

#### Lỗi: "Network Error" hoặc "CORS Error"
- Kiểm tra `VITE_API_BASE_URL` đã đúng chưa
- Kiểm tra backend có đang chạy không (Render có thể sleep)
- Kiểm tra CORS config ở backend (đã có sẵn, cho phép tất cả)

#### Lỗi: "404 Not Found" khi gọi API
- Kiểm tra URL có đúng format không (phải có `/api`)
- Kiểm tra backend có endpoint `/api` không

#### Backend bị sleep (Render free tier)
- Render free tier sẽ sleep sau 15 phút không hoạt động
- Lần đầu truy cập sẽ mất 30-60 giây để "đánh thức"
- Đây là hạn chế của free tier

---

## 🎉 Hoàn thành!

Sau khi deploy xong:
- ✅ Frontend: `https://your-frontend.vercel.app`
- ✅ Backend: `https://your-backend.onrender.com`

### Tự động deploy
- Mỗi khi bạn push code lên GitHub:
  - Render tự động redeploy backend (nếu có thay đổi trong `BE/`)
  - Vercel tự động redeploy frontend (nếu có thay đổi trong `Fe/`)

---

## 📝 Checklist Tổng Kết

- [ ] Code đã commit và push lên GitHub
- [ ] Backend build thành công local (`mvn clean install`)
- [ ] Frontend build thành công local (`npm run build`)
- [ ] Đã tạo tài khoản Render và đăng nhập
- [ ] Đã deploy backend lên Render
- [ ] Đã copy URL backend
- [ ] Đã tạo tài khoản Vercel và đăng nhập
- [ ] Đã deploy frontend lên Vercel
- [ ] Đã set `VITE_API_BASE_URL` = URL backend + `/api`
- [ ] Đã test frontend hoạt động
- [ ] Đã test API calls thành công

---

## 🆘 Cần giúp đỡ?

Nếu gặp vấn đề:
1. Xem logs trong Render/Vercel dashboard
2. Kiểm tra Console browser (F12)
3. Xem file `DEPLOY_FULL.md` để biết thêm chi tiết

