# Food App - Backend

Backend API cho ứng dụng quản lý địa điểm đi chơi, được xây dựng với Spring Boot.

## Công nghệ sử dụng

- Java 17
- Spring Boot 3.2.0
- Maven
- Lombok

## Yêu cầu

- JDK 17 hoặc cao hơn
- Maven 3.6+

## Cài đặt và chạy

```bash
# Build project
mvn clean install

# Chạy ứng dụng
mvn spring-boot:run

# Hoặc chạy JAR file
java -jar target/food-app-1.0.0.jar
```

Ứng dụng sẽ chạy tại: `http://localhost:8080`

## API Endpoints

### Location Types (Loại địa điểm)
- `GET /api/location-types` - Lấy danh sách tất cả loại địa điểm
- `GET /api/location-types/{id}` - Lấy loại địa điểm theo ID
- `POST /api/location-types` - Tạo loại địa điểm mới
- `PUT /api/location-types/{id}` - Cập nhật loại địa điểm
- `DELETE /api/location-types/{id}` - Xóa loại địa điểm

### Locations (Địa điểm)
- `GET /api/locations` - Lấy danh sách tất cả địa điểm
- `GET /api/locations/{id}` - Lấy địa điểm theo ID
- `POST /api/locations` - Tạo địa điểm mới
- `PUT /api/locations/{id}` - Cập nhật địa điểm
- `DELETE /api/locations/{id}` - Xóa địa điểm
- `GET /api/locations/search?name={name}` - Tìm kiếm địa điểm theo tên
- `GET /api/locations/filter?typeId={typeId}` - Lọc địa điểm theo loại
- `GET /api/locations/random` - Random một địa điểm
- `GET /api/locations/random/{count}` - Random nhiều địa điểm

### Trip Schedules (Lịch đi chơi)
- `GET /api/trip-schedules` - Lấy danh sách tất cả lịch đi chơi
- `GET /api/trip-schedules/{id}` - Lấy lịch đi chơi theo ID
- `POST /api/trip-schedules` - Tạo lịch đi chơi mới
- `PUT /api/trip-schedules/{id}` - Cập nhật lịch đi chơi
- `DELETE /api/trip-schedules/{id}` - Xóa lịch đi chơi

## Cấu trúc thư mục

```
BE/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/food/app/
│   │   │       ├── config/        # Cấu hình (CORS, etc.)
│   │   │       ├── controller/     # REST Controllers
│   │   │       ├── model/         # Data models
│   │   │       ├── repository/    # Data repositories (Mockdata)
│   │   │       ├── service/       # Business logic
│   │   │       └── FoodAppApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Database

Hiện tại sử dụng mockdata trong memory. Dữ liệu sẽ mất khi restart ứng dụng.

## Deploy

### Render (Khuyến nghị cho Backend)

1. Tạo file `render.yaml` trong thư mục BE
2. Kết nối repository với Render
3. Chọn "Web Service"
4. Build command: `mvn clean install`
5. Start command: `java -jar target/food-app-1.0.0.jar`

### Cấu hình Render

Tạo file `render.yaml`:

```yaml
services:
  - type: web
    name: food-app-backend
    env: java
    buildCommand: mvn clean install
    startCommand: java -jar target/food-app-1.0.0.jar
    envVars:
      - key: PORT
        value: 8080
```

## CORS

Backend đã được cấu hình để cho phép CORS từ tất cả các origin. Trong production, nên giới hạn origin cụ thể.


