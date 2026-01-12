<template>
  <div class="page-wrapper">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="hero-overlay"></div>
      <div class="hero-background" style="background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=600&fit=crop');"></div>
      
      <v-container class="hero-container">
        <div class="hero-content text-center">
          <h1 class="hero-title-white mb-4">Quản lý địa điểm</h1>
          <p class="hero-description-white mb-8">
            Khám phá và quản lý các địa điểm đi chơi yêu thích của bạn
          </p>
          <v-btn
            color="white"
            variant="flat"
            size="x-large"
            @click="openCreateModal"
            class="hero-action-btn"
          >
            Thêm địa điểm mới
          </v-btn>
        </div>
      </v-container>
    </section>

    <v-container class="content-section py-12">
    <!-- Filters Card -->
    <v-card class="filters-card mb-8" elevation="8">
      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="searchQuery"
              prepend-inner-icon="mdi-magnify"
              label="Tìm kiếm địa điểm"
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
              bg-color="white"
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
              hide-details
              bg-color="white"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else-if="filteredLocations.length === 0">
      <v-col cols="12">
        <v-card class="pa-12 text-center" elevation="0">
          <v-icon size="120" color="grey-lighten-1">mdi-map-marker-off</v-icon>
          <v-card-title class="text-h5 mt-4">Không tìm thấy địa điểm nào</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Locations Grid -->
    <v-row v-else>
      <v-col
        v-for="location in filteredLocations"
        :key="location.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="location-card-modern"
          elevation="4"
          hover
        >
          <div class="image-wrapper">
            <v-img
              :src="location.imageUrl || getDefaultImage(location)"
              height="250"
              cover
              class="location-image"
            >
              <template v-slot:placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>
            <v-chip
              v-if="location.locationType"
              class="image-badge"
              color="primary"
              size="small"
            >
              {{ location.locationType.name }}
            </v-chip>
          </div>

          <v-card-title class="text-h6 font-weight-bold pa-4">
            {{ location.name }}
          </v-card-title>

          <v-card-subtitle v-if="location.address" class="px-4">
            <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
            {{ location.address }}
          </v-card-subtitle>

          <v-card-text class="px-4 pb-4">
            <p class="text-body-2 text-medium-emphasis location-desc">
              {{ location.description || 'Chưa có mô tả' }}
            </p>
          </v-card-text>

          <v-card-actions class="px-4 pb-4 pt-2">
            <v-btn
              color="primary"
              variant="flat"
              size="default"
              @click="openEditModal(location)"
              style="min-width: 120px"
            >
              Sửa
            </v-btn>
            <v-btn
              color="error"
              variant="flat"
              size="default"
              @click="handleDelete(location.id)"
              class="ml-2"
              style="min-width: 120px"
            >
              Xóa
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create/Edit Dialog -->
    <v-dialog
      v-model="showModal"
      max-width="900"
      persistent
      scrollable
    >
      <v-card class="modern-dialog">
        <v-card-title class="text-h5 pa-6 modern-dialog-title">
          <v-icon class="mr-3" size="28">{{ editingLocation ? 'mdi-pencil' : 'mdi-plus-circle' }}</v-icon>
          {{ editingLocation ? 'Sửa địa điểm' : 'Thêm địa điểm mới' }}
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="form.name"
              label="Tên địa điểm *"
              variant="outlined"
              :rules="[rules.required]"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="form.address"
              label="Địa chỉ"
              variant="outlined"
              prepend-inner-icon="mdi-map-marker"
              class="mb-4"
            ></v-text-field>

            <v-select
              v-model="form.locationTypeId"
              :items="locationTypeOptions"
              label="Loại địa điểm *"
              variant="outlined"
              :rules="[rules.required]"
              required
              class="mb-4"
            ></v-select>

            <v-textarea
              v-model="form.description"
              label="Mô tả"
              variant="outlined"
              rows="3"
              class="mb-4"
            ></v-textarea>

            <v-text-field
              v-model="form.imageUrl"
              label="Link ảnh"
              variant="outlined"
              prepend-inner-icon="mdi-image"
              placeholder="https://example.com/image.jpg"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            size="large"
            color="grey-darken-1"
            @click="closeModal"
            class="mr-3"
          >
            Hủy
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            size="large"
            elevation="4"
            @click="handleSubmit"
            :loading="submitting"
            prepend-icon="mdi-check"
          >
            {{ editingLocation ? 'Cập nhật' : 'Tạo mới' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { locationApi, locationTypeApi } from '../services/api'
import { useSnackbar } from '../composables/useSnackbar'

export default {
  name: 'Locations',
  setup() {
    const snackbar = useSnackbar()
    return { snackbar }
  },
  data() {
    return {
      locations: [],
      locationTypes: [],
      loading: false,
      submitting: false,
      showModal: false,
      valid: false,
      editingLocation: null,
      searchQuery: '',
      selectedTypeId: null,
      form: {
        name: '',
        address: '',
        locationTypeId: null,
        description: '',
        imageUrl: ''
      },
      rules: {
        required: value => !!value || 'Trường này là bắt buộc'
      }
    }
  },
  computed: {
    locationTypeOptions() {
      return this.locationTypes.map(type => ({
        title: type.name,
        value: type.id
      }))
    },
    filteredLocations() {
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
      
      return result
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    getDefaultImage(location) {
      // Return default image based on location type or name
      if (location.name && location.name.toLowerCase().includes('cà phê')) {
        return 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop'
      }
      if (location.name && location.name.toLowerCase().includes('nhà hàng')) {
        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
      }
      if (location.name && location.name.toLowerCase().includes('công viên')) {
        return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop'
      }
      // Default restaurant image
      return 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    },
    async loadData() {
      this.loading = true
      try {
        const [locationsRes, typesRes] = await Promise.all([
          locationApi.getAll(),
          locationTypeApi.getAll()
        ])
        this.locations = locationsRes.data
        this.locationTypes = typesRes.data
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
        this.snackbar.error('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối backend.')
      } finally {
        this.loading = false
      }
    },
    openCreateModal() {
      this.editingLocation = null
      this.form = {
        name: '',
        address: '',
        locationTypeId: null,
        description: '',
        imageUrl: ''
      }
      this.showModal = true
    },
    openEditModal(location) {
      this.editingLocation = location
      this.form = { ...location }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.editingLocation = null
      this.$refs.form?.resetValidation()
    },
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.submitting = true
      try {
        if (this.editingLocation) {
          await locationApi.update(this.editingLocation.id, this.form)
          this.snackbar.success('Cập nhật địa điểm thành công!')
        } else {
          await locationApi.create(this.form)
          this.snackbar.success('Tạo địa điểm thành công!')
        }
        this.closeModal()
        this.loadData()
      } catch (error) {
        console.error('Lỗi khi lưu địa điểm:', error)
        this.snackbar.error('Không thể lưu địa điểm. Vui lòng thử lại.')
      } finally {
        this.submitting = false
      }
    },
    async handleDelete(id) {
      if (!confirm('Bạn có chắc chắn muốn xóa địa điểm này?')) return
      try {
        await locationApi.delete(id)
        this.snackbar.success('Xóa địa điểm thành công!')
        this.loadData()
      } catch (error) {
        console.error('Lỗi khi xóa địa điểm:', error)
        this.snackbar.error('Không thể xóa địa điểm. Vui lòng thử lại.')
      }
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
  background-repeat: no-repeat;
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

.hero-action-btn {
  padding: 16px 40px !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  border-radius: 12px !important;
  color: #0EA5E9 !important;
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

.location-card-modern {
  background: white !important;
  border: 1px solid #E2E8F0;
  border-radius: 16px !important;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.location-card-modern:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12) !important;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
}

.location-image {
  transition: transform 0.3s ease;
}

.location-card-modern:hover .location-image {
  transform: scale(1.08);
}

.image-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}

.location-desc {
  min-height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.modern-dialog {
  border-radius: 24px !important;
}

.modern-dialog-title {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
