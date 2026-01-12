# Food App - Frontend

Frontend cho ứng dụng quản lý địa điểm đi chơi, được xây dựng với Vue.js 3.

## Công nghệ sử dụng

- Vue.js 3
- Vue Router
- Pinia (State Management)
- Axios (HTTP Client)
- Vite (Build Tool)

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

## Cấu trúc thư mục

```
Fe/
├── src/
│   ├── components/     # Các component tái sử dụng
│   ├── views/         # Các trang chính
│   ├── router/        # Cấu hình routing
│   ├── services/      # API services
│   ├── stores/        # Pinia stores (nếu cần)
│   ├── App.vue        # Component gốc
│   ├── main.js        # Entry point
│   └── style.css      # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Môi trường

Tạo file `.env` để cấu hình:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Deploy

### Cách 1: Vercel (Khuyến nghị - Miễn phí, nhanh, dễ dùng)

#### Bước 1: Chuẩn bị
```bash
# Đảm bảo code đã được commit và push lên GitHub/GitLab
git add .
git commit -m "Prepare for deployment"
git push
```

#### Bước 2: Deploy qua Vercel Dashboard (Dễ nhất)
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng GitHub
2. Click "Add New Project"
3. Import repository của bạn
4. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `Fe` (nếu repo ở root) hoặc để trống nếu đang ở trong thư mục Fe
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Thêm biến môi trường:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: URL backend của bạn (ví dụ: `https://your-backend.onrender.com/api`)
6. Click "Deploy"

#### Bước 3: Deploy qua Vercel CLI (Tùy chọn)
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Đăng nhập
vercel login

# Deploy (từ thư mục Fe)
cd Fe
vercel

# Lần đầu sẽ hỏi cấu hình, chọn:
# - Set up and deploy? Y
# - Which scope? (chọn account của bạn)
# - Link to existing project? N
# - Project name? (nhấn Enter để dùng tên mặc định)
# - Directory? ./ (hoặc dist nếu hỏi output)
# - Override settings? N

# Sau khi deploy xong, thêm biến môi trường
vercel env add VITE_API_BASE_URL
# Nhập giá trị: https://your-backend.onrender.com/api

# Redeploy để áp dụng biến môi trường
vercel --prod
```

### Cách 2: Netlify (Miễn phí, tương tự Vercel)

1. Truy cập [netlify.com](https://netlify.com) và đăng nhập
2. Click "Add new site" → "Import an existing project"
3. Kết nối repository
4. Cấu hình:
   - **Base directory**: `Fe`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Thêm biến môi trường:
   - Vào "Site settings" → "Environment variables"
   - Thêm `VITE_API_BASE_URL` = `https://your-backend.onrender.com/api`
6. Click "Deploy site"

### Cách 3: Render (Nếu muốn dùng cùng platform với backend)

1. Truy cập [render.com](https://render.com) và đăng nhập
2. Click "New +" → "Static Site"
3. Kết nối repository
4. Cấu hình:
   - **Name**: `food-app-frontend`
   - **Branch**: `main` (hoặc branch của bạn)
   - **Root Directory**: `Fe`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Thêm biến môi trường:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: URL backend của bạn
6. Click "Create Static Site"

### Cách 4: GitHub Pages (Miễn phí, nhưng cần cấu hình thêm)

1. Cài đặt `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Thêm script vào `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Cấu hình `vite.config.js` để thêm `base` path:
```js
export default defineConfig({
  base: '/your-repo-name/', // Thay bằng tên repo của bạn
  // ... các cấu hình khác
})
```

4. Deploy:
```bash
npm run deploy
```

### Lưu ý quan trọng:

1. **Backend URL**: Đảm bảo backend đã được deploy và có URL công khai
   - Nếu backend trên Render: URL sẽ là `https://your-backend.onrender.com`
   - Thêm `/api` vào cuối: `https://your-backend.onrender.com/api`

2. **CORS**: Đảm bảo backend đã cấu hình CORS để cho phép frontend domain

3. **Biến môi trường**: 
   - Tạo file `.env` cho local development với nội dung:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
   - Thêm `.env` vào `.gitignore` (không commit file này)

4. **Kiểm tra build trước khi deploy**:
```bash
npm run build
npm run preview
```

5. **Sau khi deploy**: Kiểm tra console browser để đảm bảo API calls hoạt động đúng


