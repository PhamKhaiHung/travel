<template>
  <div class="home-page">
    <!-- Hero Section with Full Background -->
    <section class="hero-section-full">
      <div class="hero-overlay"></div>
      <div class="hero-background"></div>
      
      <v-container class="hero-container">
        <v-row align="center" justify="center" class="hero-content">
          <v-col cols="12" md="8" class="text-center hero-text">
            <div class="hero-badge-white mb-6">
              <v-icon size="20" class="mr-2">mdi-star</v-icon>
              Khám phá địa điểm mới
            </div>
            <h1 class="hero-title-white mb-6">
              Make Your Holiday<br>
              <span class="highlight-white">Memorable</span>
            </h1>
            <p class="hero-description-white mb-10">
              Thinking of taking a break from every day's busy life?<br>
              Don't worry, we take care of your trip.
            </p>
            
            <!-- Search/Booking Card -->
            <v-card class="booking-card mx-auto" elevation="12" max-width="900">
              <v-card-text class="pa-6">
                <v-row align="center">
                  <v-col cols="12" sm="6" md="3">
                    <div class="booking-field">
                      <v-icon color="primary" class="mb-2">mdi-map-marker</v-icon>
                      <div class="booking-label">Địa điểm</div>
                      <div class="booking-value">Chọn địa điểm</div>
                    </div>
                  </v-col>
                  <v-divider vertical class="d-none d-md-block"></v-divider>
                  <v-col cols="12" sm="6" md="3">
                    <div class="booking-field">
                      <v-icon color="primary" class="mb-2">mdi-account-multiple</v-icon>
                      <div class="booking-label">Số người</div>
                      <div class="booking-value">2 người</div>
                    </div>
                  </v-col>
                  <v-divider vertical class="d-none d-md-block"></v-divider>
                  <v-col cols="12" sm="6" md="3">
                    <div class="booking-field">
                      <v-icon color="primary" class="mb-2">mdi-calendar</v-icon>
                      <div class="booking-label">Ngày đi</div>
                      <div class="booking-value">Chọn ngày</div>
                    </div>
                  </v-col>
                  <v-divider vertical class="d-none d-md-block"></v-divider>
                  <v-col cols="12" sm="6" md="2">
                    <v-btn
                      color="primary"
                      size="large"
                      block
                      variant="flat"
                      elevation="0"
                      class="find-trip-btn"
                      :to="{ name: 'Locations' }"
                    >
                      <strong>Tìm</strong>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <div class="hero-actions mt-10">
              <v-btn
                size="x-large"
                color="secondary"
                variant="flat"
                elevation="4"
                class="hero-btn-primary px-8"
                :to="{ name: 'RandomLocation' }"
              >
                Random địa điểm
              </v-btn>
              <v-btn
                size="x-large"
                variant="outlined"
                color="white"
                class="hero-btn-secondary ml-4 px-8"
                :to="{ name: 'Locations' }"
              >
                Khám phá
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <!-- Floating Preview Cards -->
        <div class="floating-previews d-none d-lg-flex">
          <div class="preview-card">
            <v-img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop"
              height="200"
              cover
            >
              <div class="preview-label">
                <div class="preview-title">Nhà hàng sang trọng</div>
              </div>
            </v-img>
          </div>
          <div class="preview-card">
            <v-img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop"
              height="200"
              cover
            >
              <div class="preview-label">
                <div class="preview-title">Quán cà phê</div>
              </div>
            </v-img>
          </div>
          <div class="preview-card">
            <v-img
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=200&fit=crop"
              height="200"
              cover
            >
              <div class="preview-label">
                <div class="preview-title">Địa điểm du lịch</div>
              </div>
            </v-img>
          </div>
        </div>
      </v-container>
    </section>

    <v-container class="py-16">
    <!-- Statistics Cards -->
    <v-row class="stats-row mb-16">
      <v-col cols="12" md="4">
        <v-card 
          class="stat-card stat-card-primary pa-6" 
          elevation="0"
        >
          <div class="stat-icon-wrapper">
            <v-icon size="48" color="white">mdi-map-marker</v-icon>
          </div>
          <v-card-title class="text-h6 font-weight-bold pa-0 mt-4">
            Tổng số địa điểm
          </v-card-title>
          <v-card-text class="pa-0 mt-2">
            <div class="text-h2 font-weight-bold text-primary">{{ totalLocations }}</div>
            <div class="text-body-2 text-medium-emphasis mt-2">Địa điểm đã thêm</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card 
          class="stat-card stat-card-secondary pa-6" 
          elevation="0"
        >
          <div class="stat-icon-wrapper stat-icon-secondary">
            <v-icon size="48" color="white">mdi-calendar</v-icon>
          </div>
          <v-card-title class="text-h6 font-weight-bold pa-0 mt-4">
            Tổng số lịch đi chơi
          </v-card-title>
          <v-card-text class="pa-0 mt-2">
            <div class="text-h2 font-weight-bold text-secondary">{{ totalTrips }}</div>
            <div class="text-body-2 text-medium-emphasis mt-2">Chuyến đi đã lên kế hoạch</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card 
          class="stat-card stat-card-accent pa-6" 
          elevation="0"
        >
          <div class="stat-icon-wrapper stat-icon-accent">
            <v-icon size="48" color="white">mdi-tag</v-icon>
          </div>
          <v-card-title class="text-h6 font-weight-bold pa-0 mt-4">
            Loại địa điểm
          </v-card-title>
          <v-card-text class="pa-0 mt-2">
            <div class="text-h2 font-weight-bold text-accent">{{ totalLocationTypes }}</div>
            <div class="text-body-2 text-medium-emphasis mt-2">Danh mục địa điểm</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Feature Cards -->
    <v-row class="features-row">
      <v-col cols="12" class="text-center mb-8">
        <h2 class="text-h3 font-weight-bold mb-4">Khám phá tính năng</h2>
        <p class="text-h6 text-medium-emphasis">Mọi thứ bạn cần cho chuyến đi hoàn hảo</p>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="feature-card-modern"
          elevation="0"
          hover
          :to="{ name: 'Locations' }"
        >
          <div class="feature-image-wrapper">
            <v-img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
              height="300"
              cover
            ></v-img>
            <div class="feature-overlay">
              <v-icon size="64" color="white">mdi-map-marker</v-icon>
            </div>
          </div>
          <v-card-title class="text-h5 font-weight-bold pa-6">
            Quản lý địa điểm
          </v-card-title>
          <v-card-text class="px-6 pb-6">
            <p class="text-body-1 mb-4">
              Thêm, sửa, xóa các địa điểm đi chơi yêu thích của bạn
            </p>
            <v-btn 
              color="primary"
              variant="flat"
              size="large"
              class="feature-action-btn"
              :to="{ name: 'Locations' }"
            >
              Xem địa điểm
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="feature-card-modern"
          elevation="0"
          hover
          :to="{ name: 'TripSchedules' }"
        >
          <div class="feature-image-wrapper">
            <v-img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop"
              height="300"
              cover
            ></v-img>
            <div class="feature-overlay">
              <v-icon size="64" color="white">mdi-calendar</v-icon>
            </div>
          </div>
          <v-card-title class="text-h5 font-weight-bold pa-6">
            Lịch đi chơi
          </v-card-title>
          <v-card-text class="px-6 pb-6">
            <p class="text-body-1 mb-4">
              Tạo và quản lý lịch trình đi chơi với đánh giá và ảnh kỷ niệm
            </p>
            <v-btn 
              color="primary"
              variant="flat"
              size="large"
              class="feature-action-btn"
              :to="{ name: 'TripSchedules' }"
            >
              Xem lịch
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="feature-card-modern"
          elevation="0"
          hover
          :to="{ name: 'RandomLocation' }"
        >
          <div class="feature-image-wrapper">
            <v-img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop"
              height="300"
              cover
            ></v-img>
            <div class="feature-overlay">
              <v-icon size="64" color="white">mdi-dice-multiple</v-icon>
            </div>
          </div>
          <v-card-title class="text-h5 font-weight-bold pa-6">
            Random địa điểm
          </v-card-title>
          <v-card-text class="px-6 pb-6">
            <p class="text-body-1 mb-4">
              Không biết đi đâu? Hãy để chúng tôi giúp bạn quyết định!
            </p>
            <v-btn 
              color="primary"
              variant="flat"
              size="large"
              class="feature-action-btn"
              :to="{ name: 'RandomLocation' }"
            >
              Random ngay
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- CTA Section -->
    <v-row class="cta-section mt-16">
      <v-col cols="12">
        <v-card class="cta-card" elevation="0">
          <v-row align="center">
            <v-col cols="12" md="8" class="pa-12">
              <h2 class="text-h3 font-weight-bold text-white mb-4">
                Sẵn sàng cho chuyến đi tiếp theo?
              </h2>
              <p class="text-h6 text-white mb-6" style="opacity: 0.9">
                Đăng ký nhận thông tin về các địa điểm mới và ưu đãi đặc biệt
              </p>
              <div class="d-flex align-center">
                <v-text-field
                  placeholder="Nhập email của bạn"
                  variant="solo"
                  density="comfortable"
                  hide-details
                  class="email-input mr-4"
                  style="max-width: 400px"
                ></v-text-field>
                <v-btn
                  color="white"
                  variant="flat"
                  size="large"
                  elevation="0"
                  class="subscribe-btn"
                >
                  Đăng ký
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
import { locationApi, locationTypeApi, tripScheduleApi } from '../services/api'
import { useSnackbar } from '../composables/useSnackbar'

export default {
  name: 'Home',
  setup() {
    const snackbar = useSnackbar()
    return { snackbar }
  },
  data() {
    return {
      totalLocations: 0,
      totalTrips: 0,
      totalLocationTypes: 0
    }
  },
  mounted() {
    this.loadStats()
  },
  methods: {
    async loadStats() {
      try {
        const [locationsRes, tripsRes, typesRes] = await Promise.all([
          locationApi.getAll(),
          tripScheduleApi.getAll(),
          locationTypeApi.getAll()
        ])
        this.totalLocations = locationsRes.data.length
        this.totalTrips = tripsRes.data.length
        this.totalLocationTypes = typesRes.data.length
      } catch (error) {
        console.error('Lỗi khi tải thống kê:', error)
        this.snackbar.error('Không thể tải thống kê. Vui lòng kiểm tra kết nối backend.')
      }
    }
  }
}
</script>

<style scoped>
.home-page {
  margin: -24px;
  margin-top: -24px;
  background: #FAFAFA;
}

.hero-section-full {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&h=1080&fit=crop');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.7) 0%, rgba(20, 184, 166, 0.6) 100%);
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  min-height: 80vh;
}

.hero-badge-white {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-title-white {
  font-size: 72px;
  font-weight: 900;
  line-height: 1.1;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
}

.highlight-white {
  color: white;
  text-decoration: underline;
  text-decoration-color: #F97316;
  text-decoration-thickness: 6px;
  text-underline-offset: 8px;
}

.hero-description-white {
  font-size: 22px;
  line-height: 1.8;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.booking-card {
  border-radius: 16px !important;
  background: white !important;
}

.booking-field {
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.booking-field:hover {
  transform: translateY(-2px);
}

.booking-label {
  font-size: 12px;
  color: #64748B;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.booking-value {
  font-size: 16px;
  font-weight: 600;
  color: #0F172A;
  margin-top: 4px;
}

.find-trip-btn {
  font-weight: 700 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  height: 48px !important;
  color: white !important;
}

.hero-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-btn-primary {
  font-size: 18px !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  height: 56px !important;
  min-width: 200px !important;
  padding: 16px 40px !important;
}

.hero-btn-secondary {
  font-size: 18px !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  border-width: 3px !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  height: 56px !important;
  min-width: 200px !important;
  padding: 16px 40px !important;
}

.floating-previews {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  gap: 24px;
  z-index: 3;
}

.preview-card {
  width: 280px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  animation: floatPreview 6s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.preview-card:nth-child(2) {
  animation-delay: 1s;
  margin-top: 40px;
}

.preview-card:nth-child(3) {
  animation-delay: 2s;
}

.preview-card :deep(.v-img) {
  width: 100%;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
}

.preview-card :deep(.v-img__img) {
  object-fit: cover;
  width: 100%;
  height: 200px;
}

@keyframes floatPreview {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.preview-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.preview-title {
  color: white;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.stats-row {
  margin-top: 0;
}

.stat-card {
  background: white !important;
  border: 1px solid #E2E8F0;
  border-radius: 20px !important;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.stat-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
}

.stat-icon-secondary {
  background: linear-gradient(135deg, #F97316 0%, #FB923C 100%);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.stat-icon-accent {
  background: linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%);
  box-shadow: 0 8px 20px rgba(20, 184, 166, 0.3);
}

.feature-card-modern {
  background: white !important;
  border: 1px solid #E2E8F0;
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.4s ease;
}

.feature-card-modern:hover {
  transform: translateY(-12px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
}

.feature-image-wrapper {
  position: relative;
  overflow: hidden;
}

.feature-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(20, 184, 166, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card-modern:hover .feature-overlay {
  opacity: 1;
}

.cta-section {
  margin-bottom: 0;
}

.cta-card {
  background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%) !important;
  border-radius: 24px !important;
  overflow: hidden;
  position: relative;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.email-input {
  background: white;
  border-radius: 12px;
}

.subscribe-btn {
  font-weight: 700 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  padding: 0 40px !important;
  height: 48px !important;
  color: #0EA5E9 !important;
}

@media (max-width: 960px) {
  .hero-title-white {
    font-size: 48px;
  }
  
  .hero-description-white {
    font-size: 18px;
  }
  
  .booking-card {
    margin-top: 32px;
  }
  
  .floating-previews {
    display: none !important;
  }
}
</style>
