# 🚀 Hướng dẫn Deploy Frontend

## Bước chuẩn bị

1. **Đảm bảo backend đã được deploy** và có URL công khai
   - Ví dụ: `https://your-backend.onrender.com`
   - URL API sẽ là: `https://your-backend.onrender.com/api`

2. **Build và test local trước**:
```bash
npm run build
npm run preview
```

3. **Commit code lên Git**:
```bash
git add .
git commit -m "Prepare for deployment"
git push
```

## ⚡ Deploy nhanh với Vercel (Khuyến nghị)

### Cách 1: Qua Dashboard (Dễ nhất - 5 phút)

1. Truy cập: https://vercel.com
2. Đăng nhập bằng GitHub
3. Click **"Add New Project"**
4. Import repository của bạn
5. Cấu hình:
   - **Root Directory**: `Fe` (nếu repo ở root) hoặc để trống
   - **Framework Preset**: Vite (tự động detect)
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `dist` (tự động)
6. **Thêm Environment Variable**:
   - Click "Environment Variables"
   - Thêm:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: `https://your-backend.onrender.com/api` (thay bằng URL backend của bạn)
7. Click **"Deploy"**
8. Đợi vài phút → Done! 🎉

### Cách 2: Qua CLI

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Đăng nhập
vercel login

# Deploy (từ thư mục Fe)
cd Fe
vercel

# Thêm biến môi trường
vercel env add VITE_API_BASE_URL
# Nhập: https://your-backend.onrender.com/api

# Deploy production
vercel --prod
```

## 🌐 Deploy với Netlify

1. Truy cập: https://netlify.com
2. Đăng nhập bằng GitHub
3. Click **"Add new site"** → **"Import an existing project"**
4. Chọn repository
5. Cấu hình:
   - **Base directory**: `Fe`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Show advanced"** → Thêm biến môi trường:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.onrender.com/api`
7. Click **"Deploy site"**

## 🔧 Deploy với Render

1. Truy cập: https://render.com
2. Đăng nhập
3. Click **"New +"** → **"Static Site"**
4. Kết nối repository
5. Cấu hình:
   - **Name**: `food-app-frontend`
   - **Branch**: `main`
   - **Root Directory**: `Fe`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. Thêm Environment Variable:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.onrender.com/api`
7. Click **"Create Static Site"**

## ✅ Kiểm tra sau khi deploy

1. Truy cập URL frontend đã deploy
2. Mở Developer Tools (F12) → Console
3. Kiểm tra xem có lỗi CORS hoặc API không
4. Test các chức năng: load data, tạo mới, sửa, xóa

## 🔍 Troubleshooting

### Lỗi: API không kết nối được
- Kiểm tra biến môi trường `VITE_API_BASE_URL` đã đúng chưa
- Kiểm tra backend có đang chạy không
- Kiểm tra CORS config ở backend

### Lỗi: 404 khi refresh trang
- Đảm bảo đã cấu hình rewrite rules (đã có trong `vercel.json` và `netlify.toml`)

### Lỗi: Build failed
- Kiểm tra `npm run build` chạy được local không
- Xem log chi tiết trong dashboard của platform deploy

## 📝 Lưu ý

- **Backend URL**: Thay `https://your-backend.onrender.com/api` bằng URL backend thực tế của bạn
- **CORS**: Đảm bảo backend cho phép domain frontend
- **Environment Variables**: Phải được set ở platform deploy, không phải trong code
- **File .env**: Chỉ dùng cho local development, không commit lên Git

