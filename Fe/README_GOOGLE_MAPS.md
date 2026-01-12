# Hướng dẫn cấu hình Google Maps API

## Bước 1: Lấy API Key

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Vào **APIs & Services** > **Library**
4. Bật các API sau:
   - **Places API** (bắt buộc)
   - **Geocoding API** (bắt buộc)
   - **Maps JavaScript API** (bắt buộc)

## Bước 2: Tạo API Key

1. Vào **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy API key

## Bước 3: Cấu hình trong project

1. Tạo file `.env` trong thư mục `Fe/`
2. Thêm dòng sau:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
3. Thay `your_api_key_here` bằng API key bạn đã copy

## Bước 4: Giới hạn API Key (Khuyến nghị)

1. Vào **APIs & Services** > **Credentials**
2. Click vào API key vừa tạo
3. Trong **Application restrictions**, chọn **HTTP referrers**
4. Thêm các domain được phép:
   - `http://localhost:*` (cho development)
   - `https://yourdomain.com/*` (cho production)

## Lưu ý

- API key có giới hạn request miễn phí
- Nên giới hạn API key để tránh lạm dụng
- Không commit file `.env` lên Git


