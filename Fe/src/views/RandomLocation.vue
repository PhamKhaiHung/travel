<template>
  <v-container fluid class="random-page pa-8">
    <!-- Header -->
    <v-row class="mb-8">
      <v-col cols="12" class="text-center">
        <div class="random-icon mb-4">
          <v-icon size="80" color="accent">mdi-dice-multiple</v-icon>
        </div>
        <h1 class="text-h3 font-weight-bold modern-title mb-4">
          Random địa điểm đi chơi
        </h1>
        <p class="text-h6 text-medium-emphasis">
          Không biết đi đâu? Hãy để chúng tôi giúp bạn quyết định!
        </p>
      </v-col>
    </v-row>

    <!-- Random Controls -->
    <v-row class="mb-8">
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="8" class="random-controls-card pa-8">
          <h2 class="text-h5 font-weight-bold mb-6">Tùy chọn random</h2>
          
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                label="Tìm kiếm theo tên"
                variant="outlined"
                density="comfortable"
                clearable
                @input="handleSearch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="selectedTypeId"
                :items="locationTypeOptions"
                label="Lọc theo loại địa điểm"
                variant="outlined"
                density="comfortable"
                clearable
                @update:model-value="handleFilter"
              ></v-select>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" md="6">
              <v-btn
                color="secondary"
                variant="flat"
                size="x-large"
                block
                elevation="6"
                @click="randomSingle"
                class="random-btn"
              >
                Random 1 địa điểm
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn
                color="primary"
                variant="flat"
                size="x-large"
                block
                elevation="6"
                @click="randomMultiple"
                class="random-btn"
              >
                Random nhiều địa điểm
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular indeterminate color="accent" size="64"></v-progress-circular>
        <p class="text-h6 mt-4 text-medium-emphasis">Đang tìm kiếm...</p>
      </v-col>
    </v-row>

    <!-- Results -->
    <v-row v-else-if="randomResults.length > 0">
      <v-col cols="12" class="text-center mb-6">
        <v-chip size="large" color="accent" variant="elevated" class="result-chip">
          <v-icon start>mdi-party-popper</v-icon>
          Kết quả random: {{ randomResults.length }} địa điểm
        </v-chip>
      </v-col>
      
      <v-col
        v-for="location in randomResults"
        :key="location.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="random-result-card" elevation="6" hover>
          <v-img
            :src="location.imageUrl || 'https://via.placeholder.com/400x250'"
            height="250"
            cover
            class="result-image"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </template>
          </v-img>
          
          <v-card-title class="text-h6 font-weight-bold">
            {{ location.name }}
          </v-card-title>
          
          <v-card-subtitle v-if="location.address">
            <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
            {{ location.address }}
          </v-card-subtitle>
          
          <v-card-text>
            <p class="text-body-2 text-medium-emphasis mb-3">
              {{ location.description || 'Chưa có mô tả' }}
            </p>
            <v-chip
              v-if="location.locationType"
              size="small"
              color="accent"
              variant="tonal"
            >
              {{ location.locationType.name }}
            </v-chip>
          </v-card-text>
          
          <v-card-actions>
            <v-btn
              color="primary"
              variant="flat"
              block
              :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' ' + (location.address || ''))}`"
              target="_blank"
            >
              Xem trên bản đồ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else>
      <v-col cols="12" class="text-center py-12">
        <v-icon size="120" color="grey-lighten-1">mdi-map-marker-question</v-icon>
        <p class="text-h6 mt-4 text-medium-emphasis">
          Nhấn nút random để bắt đầu khám phá!
        </p>
      </v-col>
    </v-row>

    <!-- Random Multiple Dialog -->
    <v-dialog v-model="showRandomMultipleDialog" max-width="500">
      <v-card class="modern-dialog">
        <v-card-title class="text-h5 pa-6 modern-dialog-title">
          <v-icon class="mr-3" size="28">mdi-dice-6</v-icon>
          Random nhiều địa điểm
        </v-card-title>
        <v-card-text class="pa-6">
          <v-text-field
            v-model.number="randomCount"
            type="number"
            label="Số lượng địa điểm"
            variant="outlined"
            min="2"
            max="10"
            :rules="[rules.required, rules.min, rules.max]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            size="large"
            color="grey-darken-1"
            @click="showRandomMultipleDialog = false"
            class="mr-3"
          >
            Hủy
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            size="large"
            elevation="4"
            @click="performRandomMultiple"
            prepend-icon="mdi-check"
          >
            Random
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { locationApi, locationTypeApi } from '../services/api'
import { useSnackbar } from '../composables/useSnackbar'

export default {
  name: 'RandomLocation',
  setup() {
    const snackbar = useSnackbar()
    return { snackbar }
  },
  data() {
    return {
      locations: [],
      filteredLocations: [],
      locationTypes: [],
      randomResults: [],
      searchQuery: '',
      selectedTypeId: '',
      loading: false,
      showRandomMultipleDialog: false,
      randomCount: 3,
      rules: {
        required: value => !!value || 'Vui lòng nhập số lượng',
        min: value => value >= 2 || 'Tối thiểu 2 địa điểm',
        max: value => value <= 10 || 'Tối đa 10 địa điểm'
      }
    }
  },
  computed: {
    locationTypeOptions() {
      return [
        { title: 'Tất cả loại', value: '' },
        ...this.locationTypes.map(type => ({
          title: type.name,
          value: type.id
        }))
      ]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const [locationsRes, typesRes] = await Promise.all([
          locationApi.getAll(),
          locationTypeApi.getAll()
        ])
        this.locations = locationsRes.data
        this.filteredLocations = locationsRes.data
        this.locationTypes = typesRes.data
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
        this.snackbar.error('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối backend.')
      } finally {
        this.loading = false
      }
    },
    handleSearch() {
      this.applyFilters()
    },
    handleFilter() {
      this.applyFilters()
    },
    applyFilters() {
      let result = [...this.locations]
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(loc => 
          loc.name.toLowerCase().includes(query) ||
          (loc.address && loc.address.toLowerCase().includes(query)) ||
          (loc.description && loc.description.toLowerCase().includes(query))
        )
      }
      
      if (this.selectedTypeId) {
        result = result.filter(loc => loc.locationTypeId === this.selectedTypeId)
      }
      
      this.filteredLocations = result
    },
    randomSingle() {
      if (this.filteredLocations.length === 0) {
        this.snackbar.warning('Không có địa điểm nào để random!')
        return
      }
      
      const randomIndex = Math.floor(Math.random() * this.filteredLocations.length)
      this.randomResults = [this.filteredLocations[randomIndex]]
      this.snackbar.success('Đã random 1 địa điểm!')
    },
    randomMultiple() {
      if (this.filteredLocations.length === 0) {
        this.snackbar.warning('Không có địa điểm nào để random!')
        return
      }
      this.showRandomMultipleDialog = true
    },
    performRandomMultiple() {
      const count = Math.min(this.randomCount, this.filteredLocations.length)
      const shuffled = [...this.filteredLocations].sort(() => 0.5 - Math.random())
      this.randomResults = shuffled.slice(0, count)
      this.showRandomMultipleDialog = false
      this.snackbar.success(`Đã random ${count} địa điểm!`)
    }
  }
}
</script>

<style scoped>
.random-page {
  background: transparent;
}

.random-icon {
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.modern-title {
  background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.random-controls-card {
  background: white !important;
  border: 2px solid rgba(14, 165, 233, 0.1);
}

.random-btn {
  font-weight: 700 !important;
  font-size: 18px !important;
  height: 56px !important;
  padding: 16px 40px !important;
  color: white !important;
  border-radius: 12px !important;
}

.result-chip {
  font-size: 18px !important;
  padding: 24px 32px !important;
  font-weight: 700;
}

.random-result-card {
  background: white !important;
  border: 1px solid rgba(14, 165, 233, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.result-image {
  position: relative;
  overflow: hidden;
}

.random-result-card:hover .result-image {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.modern-dialog {
  border-radius: 24px !important;
}

.modern-dialog-title {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
