<template>
  <div class="page-wrapper">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="hero-overlay"></div>
      <div class="hero-background" style="background-image: url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=600&fit=crop');"></div>
      
      <v-container class="hero-container">
        <div class="hero-content text-center">
          <h1 class="hero-title-white mb-4">Tìm kiếm món ăn & nhà hàng</h1>
          <p class="hero-description-white mb-8">
            Tìm kiếm món ăn yêu thích và các nhà hàng gần bạn
          </p>
        </div>
      </v-container>
    </section>

    <v-container class="content-section py-12">
    <!-- Search Form -->
    <v-card class="filters-card mb-8" elevation="8">
      <v-card-text class="pa-6">
        <h2 class="text-h5 font-weight-bold mb-6">Tìm kiếm món ăn & nhà hàng</h2>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchForm.keyword"
              prepend-inner-icon="mdi-food"
              label="Từ khóa món ăn *"
              variant="outlined"
              density="comfortable"
              placeholder="Ví dụ: bún, phở, lẩu, cơm tấm"
              :rules="[rules.required]"
              hint="Nhập tên món ăn bạn muốn tìm"
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchForm.location"
              prepend-inner-icon="mdi-map-marker"
              label="Khu vực *"
              variant="outlined"
              density="comfortable"
              placeholder="Ví dụ: Quận 1, TP.HCM"
              :rules="[rules.required]"
              hint="Nhập quận hoặc khu vực"
              persistent-hint
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn
              color="primary"
              variant="flat"
              size="large"
              block
              elevation="4"
              @click="searchFoodPlaces"
              :loading="searching"
              :disabled="!canSearch"
            >
              <v-icon start>mdi-magnify</v-icon>
              Tìm kiếm
            </v-btn>
          </v-col>
        </v-row>

        <v-row v-if="userLocation" class="mt-4">
          <v-col cols="12">
            <v-alert type="info" variant="tonal" class="mb-0">
              <v-icon start>mdi-crosshairs-gps</v-icon>
              Vị trí của bạn: {{ userLocation.lat.toFixed(6) }}, {{ userLocation.lng.toFixed(6) }}
              <v-btn
                size="small"
                variant="text"
                @click="getUserLocation"
                class="ml-2"
              >
                Cập nhật
              </v-btn>
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Loading -->
    <v-row v-if="searching">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="text-h6 mt-4 text-medium-emphasis">Đang tìm kiếm món ăn và nhà hàng...</p>
      </v-col>
    </v-row>

    <!-- Results -->
    <v-row v-else-if="results.length > 0">
      <v-col cols="12" class="mb-4">
        <div class="d-flex align-center justify-space-between flex-wrap">
          <v-chip size="large" color="primary" variant="elevated">
            <v-icon start>mdi-food</v-icon>
            Tìm thấy {{ results.length }} kết quả
          </v-chip>
          <div class="d-flex ga-2 mt-2">
            <v-btn
              color="secondary"
              variant="flat"
              @click="randomFromResults"
              prepend-icon="mdi-dice-multiple"
            >
              Random 1 kết quả
            </v-btn>
            <v-btn
              color="accent"
              variant="flat"
              @click="exportResults"
              prepend-icon="mdi-download"
            >
              Xuất dữ liệu
            </v-btn>
          </div>
        </div>
      </v-col>

      <v-col
        v-for="(result, index) in results"
        :key="result.id || index"
        cols="12"
        md="6"
        :data-result-id="result.id || index"
      >
        <v-card class="result-card" elevation="4" hover>
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-store</v-icon>
            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold">{{ result.restaurantName }}</div>
              <div v-if="result.dishName" class="text-subtitle-2 text-medium-emphasis">
                Món: {{ result.dishName }}
              </div>
            </div>
            <v-chip
              v-if="result.rating && result.rating !== 'N/A'"
              size="small"
              color="warning"
              variant="tonal"
            >
              <v-icon start size="small">mdi-star</v-icon>
              {{ result.rating }}
            </v-chip>
          </v-card-title>

          <v-card-subtitle v-if="result.address">
            <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
            {{ result.address }}
          </v-card-subtitle>

          <v-card-text>
            <div class="mb-2">
              <v-chip
                size="small"
                color="primary"
                variant="tonal"
                class="mr-1"
              >
                {{ result.foodCategory }}
              </v-chip>
              <v-chip
                v-if="result.trendTag"
                size="small"
                color="error"
                variant="tonal"
                class="mr-1"
              >
                <v-icon start size="small">mdi-fire</v-icon>
                {{ result.trendTag }}
              </v-chip>
              <v-chip
                size="small"
                color="info"
                variant="outlined"
              >
                {{ result.dataSource }}
              </v-chip>
            </div>

            <div v-if="result.distance" class="mb-2">
              <v-chip size="small" color="accent" variant="tonal">
                <v-icon start size="small">mdi-map-marker-distance</v-icon>
                Cách bạn {{ formatDistance(result.distance) }}
              </v-chip>
            </div>

            <div class="d-flex align-center ga-4 mt-2">
              <div v-if="result.rating && result.rating !== 'N/A'">
                <v-icon size="small" class="mr-1">mdi-star</v-icon>
                <span class="text-body-2">Đánh giá: {{ result.rating }}/5</span>
              </div>
              <div v-if="result.reviewCount">
                <v-icon size="small" class="mr-1">mdi-comment-multiple</v-icon>
                <span class="text-body-2">{{ formatReviewCount(result.reviewCount) }} đánh giá</span>
              </div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              variant="flat"
              :href="result.googleMapsUrl"
              target="_blank"
              prepend-icon="mdi-google-maps"
            >
              Xem trên bản đồ
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="result.website"
              variant="outlined"
              :href="result.website"
              target="_blank"
              prepend-icon="mdi-web"
            >
              Website
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else-if="hasSearched && !searching">
      <v-col cols="12">
        <v-card class="pa-12 text-center" elevation="0">
          <v-icon size="120" color="grey-lighten-1">mdi-food-off</v-icon>
          <v-card-title class="text-h5 mt-4">Không tìm thấy kết quả nào</v-card-title>
          <v-card-text>Vui lòng thử lại với từ khóa hoặc khu vực khác</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- API Key Notice -->
    <v-alert
      v-if="!googleMapsLoaded"
      type="warning"
      variant="tonal"
      class="mt-8"
    >
      <v-icon start>mdi-alert</v-icon>
      <strong>Lưu ý:</strong> Để sử dụng tính năng này, bạn cần cấu hình Google Maps API key trong file <code>.env</code>
      <br>
      Thêm: <code>VITE_GOOGLE_MAPS_API_KEY=your_api_key_here</code>
    </v-alert>
    </v-container>
  </div>
</template>

<script>
import { useSnackbar } from '../composables/useSnackbar'

export default {
  name: 'GoogleMapsRandom',
  setup() {
    const snackbar = useSnackbar()
    return { snackbar }
  },
  data() {
    return {
      googleMapsLoaded: false,
      placesService: null,
      geocoder: null,
      userLocation: null,
      searching: false,
      hasSearched: false,
      results: [],
      searchForm: {
        keyword: '',
        location: ''
      },
      rules: {
        required: value => !!value || 'Trường này là bắt buộc'
      }
    }
  },
  computed: {
    canSearch() {
      return this.searchForm.keyword && this.searchForm.location && this.googleMapsLoaded
    }
  },
  mounted() {
    this.loadGoogleMaps()
    this.getUserLocation()
  },
  methods: {
    loadGoogleMaps() {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        console.warn('Google Maps API key not found. Please add VITE_GOOGLE_MAPS_API_KEY to .env file')
        return
      }

      if (window.google && window.google.maps) {
        this.initGoogleMaps()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        this.initGoogleMaps()
      }
      script.onerror = () => {
        this.snackbar.error('Không thể tải Google Maps API. Vui lòng kiểm tra API key.')
      }
      document.head.appendChild(script)
    },
    initGoogleMaps() {
      if (!window.google || !window.google.maps) return

      this.googleMapsLoaded = true
      const map = new google.maps.Map(document.createElement('div'))
      this.placesService = new google.maps.places.PlacesService(map)
      this.geocoder = new google.maps.Geocoder()
    },
    getUserLocation() {
      if (!navigator.geolocation) {
        this.snackbar.warning('Trình duyệt không hỗ trợ định vị')
        this.userLocation = { lat: 10.8231, lng: 106.6297 } // Default to HCMC
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        },
        (error) => {
          console.error('Geolocation error:', error)
          this.userLocation = { lat: 10.8231, lng: 106.6297 } // Default to HCMC
        }
      )
    },
    async geocodeLocation(location) {
      return new Promise((resolve, reject) => {
        if (!this.geocoder) {
          reject(new Error('Geocoder not initialized'))
          return
        }

        const address = location.includes('TP.HCM') || location.includes('Ho Chi Minh')
          ? location
          : `${location}, TP.HCM, Vietnam`

        this.geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0].geometry.location)
          } else {
            reject(new Error('Geocoding failed'))
          }
        })
      })
    },
    normalizeVietnameseText(text) {
      if (!text) return ''
      // Normalize Vietnamese accents and remove extra spaces
      return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .normalize('NFC')
        .trim()
        .replace(/\s+/g, ' ')
    },
    async searchFoodPlaces() {
      if (!this.canSearch) {
        this.snackbar.warning('Vui lòng điền đầy đủ thông tin')
        return
      }

      this.searching = true
      this.hasSearched = true
      this.results = []

      try {
        // Geocode the location
        const locationCoords = await this.geocodeLocation(this.searchForm.location)

        // Build search query
        const query = `${this.searchForm.keyword} ${this.searchForm.location}, TP.HCM`

        // Search for places
        const request = {
          query: query,
          location: locationCoords,
          radius: 5000, // 5km radius
          type: ['restaurant', 'food', 'cafe', 'meal_takeaway']
        }

        this.placesService.textSearch(request, async (places, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && places) {
            // Process and normalize results
            const processedResults = await this.processPlaces(places)
            
            // Remove duplicates
            this.results = this.removeDuplicates(processedResults)
            
            // Sort by distance if available
            if (this.userLocation) {
              this.results.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
            }

            this.snackbar.success(`Tìm thấy ${this.results.length} kết quả`)
          } else {
            this.snackbar.warning('Không tìm thấy kết quả nào. Vui lòng thử lại với từ khóa khác.')
          }
          this.searching = false
        })
      } catch (error) {
        this.searching = false
        console.error('Search error:', error)
        this.snackbar.error('Lỗi khi tìm kiếm. Vui lòng thử lại.')
      }
    },
    async processPlaces(places) {
      const processed = []

      for (const place of places) {
        // Skip closed places
        if (place.business_status === 'CLOSED_PERMANENTLY') continue

        // Calculate distance
        let distance = null
        if (this.userLocation && place.geometry) {
          distance = this.calculateDistance(
            this.userLocation.lat,
            this.userLocation.lng,
            place.geometry.location.lat(),
            place.geometry.location.lng()
          )
        }

        // Extract dish name from place name or description
        const dishName = this.extractDishName(place, this.searchForm.keyword)

        // Determine food category
        const foodCategory = this.determineFoodCategory(place, this.searchForm.keyword)

        // Get rating and review count
        const rating = place.rating ? place.rating.toFixed(1) : 'N/A'
        const reviewCount = place.user_ratings_total || null

        // Determine data source
        const dataSource = 'Google Places API'

        // Check for trend tags
        const trendTag = this.determineTrendTag(place)

        // Normalize text
        const restaurantName = this.normalizeVietnameseText(place.name)
        const address = this.normalizeVietnameseText(
          place.vicinity || place.formatted_address || ''
        )

        processed.push({
          id: place.place_id,
          dishName: dishName || null,
          restaurantName: restaurantName,
          address: address,
          foodCategory: foodCategory,
          rating: rating,
          reviewCount: reviewCount,
          dataSource: dataSource,
          trendTag: trendTag,
          distance: distance,
          geometry: place.geometry,
          website: place.website || null,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + (place.vicinity || place.formatted_address || ''))}`,
          placeId: place.place_id
        })
      }

      return processed
    },
    extractDishName(place, keyword) {
      // Try to extract dish name from place name
      const name = place.name.toLowerCase()
      const keywordLower = keyword.toLowerCase()

      // If place name contains the keyword, it might be the dish
      if (name.includes(keywordLower)) {
        // Extract the dish part
        const parts = name.split(keywordLower)
        if (parts.length > 1) {
          return keyword // Return normalized keyword as dish name
        }
      }

      // Check types for dish indicators
      const dishTypes = ['meal_takeaway', 'restaurant', 'food']
      const hasDishType = place.types?.some(type => dishTypes.includes(type))

      if (hasDishType) {
        return keyword // Use keyword as dish name
      }

      return null
    },
    determineFoodCategory(place, keyword) {
      // Normalize keyword to category
      const keywordLower = keyword.toLowerCase()
      
      // Common Vietnamese food categories
      const categories = {
        'bún': 'Bún',
        'phở': 'Phở',
        'lẩu': 'Lẩu',
        'cơm': 'Cơm',
        'bánh': 'Bánh',
        'chè': 'Chè',
        'nước': 'Nước uống',
        'mì': 'Mì',
        'bánh mì': 'Bánh mì',
        'gà': 'Gà',
        'lẩu': 'Lẩu'
      }

      for (const [key, category] of Object.entries(categories)) {
        if (keywordLower.includes(key)) {
          return category
        }
      }

      // Check place types
      if (place.types) {
        if (place.types.includes('restaurant')) return 'Nhà hàng'
        if (place.types.includes('cafe')) return 'Cà phê'
        if (place.types.includes('meal_takeaway')) return 'Đồ ăn nhanh'
      }

      return keyword.charAt(0).toUpperCase() + keyword.slice(1)
    },
    determineTrendTag(place) {
      // Determine if place is trending based on rating and review count
      if (!place.rating || !place.user_ratings_total) return null

      const rating = place.rating
      const reviews = place.user_ratings_total

      if (rating >= 4.5 && reviews >= 100) return 'Hot'
      if (rating >= 4.0 && reviews >= 50) return 'Popular'
      if (reviews >= 500) return 'Viral'

      return null
    },
    removeDuplicates(results) {
      const seen = new Set()
      const unique = []

      for (const result of results) {
        // Create a unique key from restaurant name and address
        const key = `${this.normalizeVietnameseText(result.restaurantName)}_${this.normalizeVietnameseText(result.address)}`
        
        if (!seen.has(key)) {
          seen.add(key)
          unique.push(result)
        }
      }

      return unique
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371 // Radius of the Earth in km
      const dLat = this.deg2rad(lat2 - lat1)
      const dLon = this.deg2rad(lon2 - lon1)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) *
          Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180)
    },
    formatDistance(distance) {
      if (distance < 1) {
        return `${Math.round(distance * 1000)}m`
      }
      return `${distance.toFixed(1)}km`
    },
    formatReviewCount(count) {
      if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`
      }
      return count.toString()
    },
    randomFromResults() {
      if (this.results.length === 0) {
        this.snackbar.warning('Không có kết quả nào để random')
        return
      }

      const randomIndex = Math.floor(Math.random() * this.results.length)
      const randomResult = this.results[randomIndex]

      // Scroll to the random result
      const element = document.querySelector(`[data-result-id="${randomResult.id}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element.classList.add('highlight-result')
        setTimeout(() => {
          element.classList.remove('highlight-result')
        }, 2000)
      }

      this.snackbar.success(`Random: ${randomResult.restaurantName}`)
    },
    exportResults() {
      if (this.results.length === 0) {
        this.snackbar.warning('Không có dữ liệu để xuất')
        return
      }

      // Convert to CSV
      const headers = ['Dish Name', 'Restaurant Name', 'Address', 'Food Category', 'Rating', 'Review Count', 'Distance', 'Data Source', 'Trend Tag', 'Google Maps URL']
      const rows = this.results.map(r => [
        r.dishName || 'N/A',
        r.restaurantName,
        r.address,
        r.foodCategory,
        r.rating,
        r.reviewCount || 'N/A',
        r.distance ? this.formatDistance(r.distance) : 'N/A',
        r.dataSource,
        r.trendTag || 'N/A',
        r.googleMapsUrl
      ])

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      // Download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `food_results_${new Date().getTime()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      this.snackbar.success('Đã xuất dữ liệu thành công!')
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  margin: -24px;
  margin-top: -24px;
  background: #FAFAFA;
}

.page-hero {
  position: relative;
  height: 400px;
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
  background-size: cover;
  background-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.85) 0%, rgba(20, 184, 166, 0.75) 100%);
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  padding: 60px 0;
}

.hero-title-white {
  font-size: 56px;
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.hero-description-white {
  font-size: 22px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.content-section {
  margin-top: -80px;
  position: relative;
  z-index: 3;
}

.filters-card {
  background: white !important;
  border-radius: 20px !important;
  border: 2px solid rgba(14, 165, 233, 0.2);
  box-shadow: 0 10px 40px rgba(14, 165, 233, 0.15) !important;
}

.result-card {
  background: white !important;
  border: 1px solid #E2E8F0;
  border-radius: 16px !important;
  transition: all 0.3s ease;
  height: 100%;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12) !important;
}

.result-card.highlight-result {
  border: 3px solid #0EA5E9;
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.5) !important;
  animation: pulse 1s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@media (max-width: 960px) {
  .hero-title-white {
    font-size: 36px;
  }
  
  .hero-description-white {
    font-size: 18px;
  }
  
  .page-hero {
    height: 300px;
  }
  
  .content-section {
    margin-top: -40px;
  }
}
</style>
