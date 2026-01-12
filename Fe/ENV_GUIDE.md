# 📝 Hướng dẫn cấu hình VITE_API_BASE_URL

## VITE_API_BASE_URL là gì?

`VITE_API_BASE_URL` là biến môi trường chứa URL của backend API. Frontend sẽ dùng URL này để gọi API.

Trong code, nó được sử dụng ở đây:

```3:3:Fe/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
```

## 🔍 Lấy URL backend từ đâu?

### Bước 1: Deploy backend trước

Backend của bạn cần được deploy lên một platform như:
- **Render** (khuyến nghị - có free tier)
- Railway
- Fly.io
- Heroku
- Hoặc server riêng của bạn

### Bước 2: Lấy URL backend sau khi deploy

Sau khi deploy backend, bạn sẽ nhận được một URL công khai, ví dụ:

**Nếu deploy lên Render:**
- URL sẽ có dạng: `https://food-app-backend-xxxx.onrender.com`
- Hoặc: `https://food-app-backend.onrender.com`

**Nếu deploy lên Railway:**
- URL sẽ có dạng: `https://your-app.railway.app`

**Nếu deploy lên server riêng:**
- URL sẽ là domain/IP của bạn, ví dụ: `https://api.yourdomain.com`

### Bước 3: Thêm `/api` vào cuối

Vì backend của bạn có prefix `/api`, nên URL đầy đủ sẽ là:

```
https://food-app-backend.onrender.com/api
```

## 📍 Điền vào đâu?

### 1. Cho Local Development (máy tính của bạn)

Tạo file `.env` trong thư mục `Fe/`:

```bash
# Tạo file .env trong thư mục Fe
cd Fe
```

Nội dung file `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

**Lưu ý:** File `.env` đã được thêm vào `.gitignore`, không commit lên Git.

### 2. Cho Production (Vercel/Netlify/Render)

#### Trên Vercel:

1. Vào project của bạn trên Vercel
2. Click **"Settings"** → **"Environment Variables"**
3. Click **"Add New"**
4. Điền:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.onrender.com/api` (thay bằng URL backend thực tế)
   - **Environment**: Chọn `Production`, `Preview`, `Development` (hoặc cả 3)
5. Click **"Save"**
6. **Redeploy** project để áp dụng biến môi trường mới

#### Trên Netlify:

1. Vào project của bạn trên Netlify
2. Click **"Site settings"** → **"Environment variables"**
3. Click **"Add variable"**
4. Điền:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.onrender.com/api`
   - **Scopes**: Chọn `All scopes` hoặc `Production`
5. Click **"Save"**
6. **Redeploy** site

#### Trên Render:

1. Vào Static Site của bạn trên Render
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Điền:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.onrender.com/api`
5. Click **"Save Changes"**
6. Render sẽ tự động redeploy

## 📋 Ví dụ cụ thể

### Ví dụ 1: Backend deploy lên Render

**Backend URL từ Render:**
```
https://food-app-backend-abc123.onrender.com
```

**Giá trị VITE_API_BASE_URL:**
```
https://food-app-backend-abc123.onrender.com/api
```

### Ví dụ 2: Backend chạy local (development)

**Giá trị VITE_API_BASE_URL:**
```
http://localhost:8080/api
```

### Ví dụ 3: Backend deploy lên Railway

**Backend URL từ Railway:**
```
https://food-app-production.up.railway.app
```

**Giá trị VITE_API_BASE_URL:**
```
https://food-app-production.up.railway.app/api
```

## ✅ Kiểm tra

Sau khi cấu hình, kiểm tra bằng cách:

1. **Local:**
```bash
cd Fe
npm run dev
# Mở browser, vào http://localhost:3000
# Mở Console (F12) → Network tab
# Xem các API calls có dùng đúng URL không
```

2. **Production:**
- Truy cập URL frontend đã deploy
- Mở Console (F12) → Network tab
- Kiểm tra API calls có thành công không

## 🔧 Troubleshooting

### Lỗi: "Network Error" hoặc "CORS Error"

- Kiểm tra backend có đang chạy không
- Kiểm tra URL trong `VITE_API_BASE_URL` đúng chưa
- Kiểm tra backend đã cấu hình CORS chưa

### Lỗi: "404 Not Found"

- Kiểm tra URL có đúng format không (phải có `/api` ở cuối)
- Kiểm tra backend có endpoint `/api` không

### Biến môi trường không áp dụng

- Đảm bảo đã redeploy sau khi thêm biến môi trường
- Kiểm tra tên biến có đúng `VITE_API_BASE_URL` không (phải bắt đầu bằng `VITE_`)
- Với Vite, chỉ các biến bắt đầu bằng `VITE_` mới được expose ra client

