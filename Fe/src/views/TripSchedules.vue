<template>
  <v-container fluid class="trips-page pa-8">
    <!-- Header -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <h1 class="text-h3 font-weight-bold modern-title">Quản lý lịch đi chơi</h1>
        <p class="text-body-1 text-medium-emphasis mt-2">
          Lên kế hoạch và quản lý các chuyến đi của bạn
        </p>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end">
        <v-btn
          color="primary"
          variant="flat"
          prepend-icon="mdi-plus"
          size="large"
          elevation="4"
          @click="openCreateModal"
          class="modern-btn"
        >
          Thêm lịch đi chơi
        </v-btn>
      </v-col>
    </v-row>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else-if="tripSchedules.length === 0">
      <v-col cols="12">
        <v-card class="pa-12 text-center" elevation="2">
          <v-icon size="120" color="grey-lighten-1">mdi-calendar-blank</v-icon>
          <v-card-title class="text-h5 mt-4">Chưa có lịch đi chơi nào</v-card-title>
          <v-card-text>Tạo lịch đi chơi đầu tiên của bạn ngay!</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Schedules List -->
    <v-row v-else>
      <v-col
        v-for="schedule in tripSchedules"
        :key="schedule.id"
        cols="12"
      >
        <v-card class="trip-card" elevation="4" hover>
          <v-card-title class="d-flex align-center pa-6 trip-card-header">
            <v-icon class="mr-3" size="32" color="accent">mdi-calendar-check</v-icon>
            <span class="text-h5 font-weight-bold">{{ schedule.title }}</span>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="flat"
              @click="openEditModal(schedule)"
              class="mr-2"
            >
              Sửa
            </v-btn>
            <v-btn
              color="error"
              variant="flat"
              @click="handleDelete(schedule.id)"
            >
              Xóa
            </v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text class="pa-6">
            <v-row>
              <v-col cols="12" md="6">
                <div class="info-item mb-4">
                  <v-icon class="mr-2" color="primary">mdi-clock-start</v-icon>
                  <span class="font-weight-medium">Bắt đầu:</span>
                  <span class="ml-2">{{ formatDateTime(schedule.startTime) }}</span>
                </div>
                <div class="info-item">
                  <v-icon class="mr-2" color="error">mdi-clock-end</v-icon>
                  <span class="font-weight-medium">Kết thúc:</span>
                  <span class="ml-2">{{ formatDateTime(schedule.endTime) }}</span>
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="info-item mb-4">
                  <v-icon class="mr-2" color="accent">mdi-map-marker-multiple</v-icon>
                  <span class="font-weight-medium">Số địa điểm:</span>
                  <span class="ml-2">{{ schedule.locationIds?.length || 0 }}</span>
                </div>
                <div v-if="schedule.rating" class="info-item">
                  <v-icon class="mr-2" color="warning">mdi-star</v-icon>
                  <span class="font-weight-medium">Đánh giá:</span>
                  <span class="ml-2">{{ schedule.rating }}/10</span>
                </div>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <div v-if="schedule.locationIds && schedule.locationIds.length > 0" class="mb-4">
              <h3 class="text-h6 font-weight-bold mb-3">
                <v-icon class="mr-2" color="primary">mdi-map-marker</v-icon>
                Địa điểm trong lịch trình
              </h3>
              <div class="locations-chips">
                <v-chip
                  v-for="locId in schedule.locationIds"
                  :key="locId"
                  color="primary"
                  variant="tonal"
                  class="ma-1"
                  size="default"
                >
                  {{ getLocationName(locId) }}
                </v-chip>
              </div>
            </div>

            <div v-if="schedule.notes" class="mb-4">
              <h3 class="text-h6 font-weight-bold mb-3">
                <v-icon class="mr-2" color="info">mdi-note-text</v-icon>
                Ghi chú
              </h3>
              <p class="text-body-1">{{ schedule.notes }}</p>
            </div>

            <div v-if="schedule.comment" class="mb-4">
              <h3 class="text-h6 font-weight-bold mb-3">
                <v-icon class="mr-2" color="secondary">mdi-comment-text</v-icon>
                Nhận xét
              </h3>
              <p class="text-body-1">{{ schedule.comment }}</p>
            </div>

            <div v-if="schedule.images && schedule.images.length > 0">
              <h3 class="text-h6 font-weight-bold mb-3">
                <v-icon class="mr-2" color="accent">mdi-camera</v-icon>
                Ảnh kỷ niệm ({{ schedule.images.length }})
              </h3>
              <v-row>
                <v-col
                  v-for="(image, index) in schedule.images"
                  :key="index"
                  cols="6"
                  sm="4"
                  md="3"
                >
                  <v-img
                    :src="image"
                    aspect-ratio="1"
                    cover
                    class="memory-image"
                    @error="handleImageError"
                  >
                    <template v-slot:placeholder>
                      <div class="d-flex align-center justify-center fill-height">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                      </div>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create/Edit Dialog -->
    <v-dialog
      v-model="showModal"
      max-width="1200"
      persistent
      scrollable
    >
      <v-card class="modern-dialog">
        <v-card-title class="text-h5 pa-6 modern-dialog-title">
          <v-icon class="mr-3" size="28">{{ editingSchedule ? 'mdi-pencil' : 'mdi-plus-circle' }}</v-icon>
          {{ editingSchedule ? 'Sửa lịch đi chơi' : 'Thêm lịch đi chơi mới' }}
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6" style="max-height: 70vh">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="form.title"
              label="Tiêu đề *"
              variant="outlined"
              :rules="[rules.required]"
              required
              class="mb-4"
            ></v-text-field>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.startTime"
                  label="Thời gian bắt đầu *"
                  type="datetime-local"
                  variant="outlined"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.endTime"
                  label="Thời gian kết thúc *"
                  type="datetime-local"
                  variant="outlined"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card class="mb-4 location-selector-card" variant="outlined">
              <v-card-title class="bg-primary-lighten-5 pa-4">
                <v-icon class="mr-2">mdi-map-marker-multiple</v-icon>
                Chọn địa điểm *
              </v-card-title>
              <v-card-text class="pa-4">
                <v-row class="mb-4">
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="locationSearch"
                      prepend-inner-icon="mdi-magnify"
                      label="Tìm kiếm địa điểm"
                      variant="outlined"
                      density="compact"
                      clearable
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="locationTypeFilter"
                      :items="locationTypeFilterOptions"
                      label="Lọc theo loại"
                      variant="outlined"
                      density="compact"
                      clearable
                      hide-details
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn
                      color="secondary"
                      variant="flat"
                      block
                      @click="showRandomLocationModal = true"
                      prepend-icon="mdi-dice-multiple"
                    >
                      Random địa điểm
                    </v-btn>
                  </v-col>
                </v-row>

                <v-data-table
                  v-model="selectedLocations"
                  :headers="locationHeaders"
                  :items="filteredLocationsForTable"
                  :search="locationSearch"
                  show-select
                  item-value="id"
                  class="elevation-1"
                  density="comfortable"
                >
                </v-data-table>

                <div v-if="selectedLocations.length > 0" class="mt-4">
                  <h4 class="text-subtitle-1 font-weight-bold mb-2">
                    Đã chọn {{ selectedLocations.length }} địa điểm:
                  </h4>
                  <v-chip
                    v-for="loc in selectedLocations"
                    :key="loc"
                    class="ma-1"
                    closable
                    color="primary"
                    @click:close="removeLocation(loc)"
                  >
                    {{ getLocationNameById(loc) }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>

            <v-textarea
              v-model="form.notes"
              label="Ghi chú"
              variant="outlined"
              rows="3"
              class="mb-4"
            ></v-textarea>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.number="form.rating"
                  label="Đánh giá (1-10)"
                  type="number"
                  variant="outlined"
                  min="1"
                  max="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.comment"
                  label="Nhận xét"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-textarea
              v-model="imagesText"
              label="Link ảnh kỷ niệm (mỗi link một dòng)"
              variant="outlined"
              rows="3"
              placeholder="https://example.com/image1.jpg"
            ></v-textarea>
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
            {{ editingSchedule ? 'Cập nhật' : 'Tạo mới' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Random Location Dialog -->
    <v-dialog v-model="showRandomLocationModal" max-width="500">
      <v-card class="modern-dialog">
        <v-card-title class="text-h5 pa-6 modern-dialog-title">
          <v-icon class="mr-3" size="28">mdi-dice-multiple</v-icon>
          Random địa điểm
        </v-card-title>
        <v-card-text class="pa-6">
          <v-text-field
            v-model.number="randomLocationCount"
            type="number"
            label="Số lượng địa điểm"
            variant="outlined"
            min="1"
            :max="filteredLocationsForTable.length"
            :rules="[rules.required, rules.minRandom]"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            size="large"
            color="grey-darken-1"
            @click="showRandomLocationModal = false"
            class="mr-3"
          >
            Hủy
          </v-btn>
          <v-btn
            color="primary"
            variant="flat"
            size="large"
            elevation="4"
            @click="performRandomLocations"
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
import { tripScheduleApi, locationApi, locationTypeApi } from '../services/api'
import { useSnackbar } from '../composables/useSnackbar'

export default {
  name: 'TripSchedules',
  setup() {
    const snackbar = useSnackbar()
    return { snackbar }
  },
  data() {
    return {
      tripSchedules: [],
      locations: [],
      locationTypes: [],
      loading: false,
      submitting: false,
      showModal: false,
      showRandomLocationModal: false,
      valid: false,
      editingSchedule: null,
      selectedLocations: [],
      locationSearch: '',
      locationTypeFilter: '',
      randomLocationCount: 3,
      imagesText: '',
      form: {
        title: '',
        startTime: '',
        endTime: '',
        locationIds: [],
        notes: '',
        rating: null,
        comment: '',
        images: []
      },
      locationHeaders: [
        { title: 'Tên địa điểm', key: 'name', sortable: true },
        { title: 'Địa chỉ', key: 'address', sortable: true },
      ],
      rules: {
        required: value => !!value || 'Trường này là bắt buộc',
        minRandom: value => value >= 1 || 'Tối thiểu 1 địa điểm'
      }
    }
  },
  computed: {
    locationTypeFilterOptions() {
      return [
        { title: 'Tất cả loại', value: '' },
        ...this.locationTypes.map(type => ({
          title: type.name,
          value: type.id
        }))
      ]
    },
    filteredLocationsForTable() {
      let result = [...this.locations]
      
      if (this.locationTypeFilter) {
        result = result.filter(loc => loc.locationTypeId === this.locationTypeFilter)
      }
      
      return result
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const [schedulesRes, locationsRes, typesRes] = await Promise.all([
          tripScheduleApi.getAll(),
          locationApi.getAll(),
          locationTypeApi.getAll()
        ])
        this.tripSchedules = schedulesRes.data
        this.locations = locationsRes.data
        this.locationTypes = typesRes.data
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
        this.snackbar.error('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối backend.')
      } finally {
        this.loading = false
      }
    },
    getLocationName(id) {
      const location = this.locations.find(l => l.id === id)
      return location ? location.name : `Địa điểm #${id}`
    },
    getLocationNameById(id) {
      return this.getLocationName(id)
    },
    formatDateTime(datetime) {
      if (!datetime) return ''
      const date = new Date(datetime)
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    openCreateModal() {
      this.editingSchedule = null
      this.form = {
        title: '',
        startTime: '',
        endTime: '',
        locationIds: [],
        notes: '',
        rating: null,
        comment: '',
        images: []
      }
      this.selectedLocations = []
      this.imagesText = ''
      this.showModal = true
    },
    openEditModal(schedule) {
      this.editingSchedule = schedule
      this.form = { ...schedule }
      this.selectedLocations = schedule.locationIds || []
      this.imagesText = schedule.images ? schedule.images.join('\n') : ''
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.editingSchedule = null
      this.$refs.form?.resetValidation()
    },
    removeLocation(locId) {
      this.selectedLocations = this.selectedLocations.filter(id => id !== locId)
    },
    performRandomLocations() {
      const count = Math.min(this.randomLocationCount, this.filteredLocationsForTable.length)
      const shuffled = [...this.filteredLocationsForTable].sort(() => 0.5 - Math.random())
      const randomIds = shuffled.slice(0, count).map(loc => loc.id)
      this.selectedLocations = [...new Set([...this.selectedLocations, ...randomIds])]
      this.showRandomLocationModal = false
      this.snackbar.success(`Đã random ${count} địa điểm!`)
    },
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      if (this.selectedLocations.length === 0) {
        this.snackbar.warning('Vui lòng chọn ít nhất 1 địa điểm!')
        return
      }

      this.submitting = true
      try {
        const images = this.imagesText
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)

        const data = {
          ...this.form,
          locationIds: this.selectedLocations,
          images: images.length > 0 ? images : []
        }

        if (this.editingSchedule) {
          await tripScheduleApi.update(this.editingSchedule.id, data)
          this.snackbar.success('Cập nhật lịch đi chơi thành công!')
        } else {
          await tripScheduleApi.create(data)
          this.snackbar.success('Tạo lịch đi chơi thành công!')
        }
        this.closeModal()
        this.loadData()
      } catch (error) {
        console.error('Lỗi khi lưu lịch đi chơi:', error)
        this.snackbar.error('Không thể lưu lịch đi chơi. Vui lòng thử lại.')
      } finally {
        this.submitting = false
      }
    },
    async handleDelete(id) {
      if (!confirm('Bạn có chắc chắn muốn xóa lịch đi chơi này?')) return
      try {
        await tripScheduleApi.delete(id)
        this.snackbar.success('Xóa lịch đi chơi thành công!')
        this.loadData()
      } catch (error) {
        console.error('Lỗi khi xóa lịch đi chơi:', error)
        this.snackbar.error('Không thể xóa lịch đi chơi. Vui lòng thử lại.')
      }
    },
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found'
    }
  }
}
</script>

<style scoped>
.trips-page {
  background: transparent;
}

.modern-title {
  background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modern-btn {
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  padding: 12px 32px !important;
  height: 48px !important;
}

.trip-card {
  background: white !important;
  border: 1px solid rgba(14, 165, 233, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.trip-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(14, 165, 233, 0.15) !important;
}

.trip-card-header {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.locations-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.memory-image {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.memory-image:hover {
  transform: scale(1.05);
}

.modern-dialog {
  border-radius: 24px !important;
}

.modern-dialog-title {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05) 0%, rgba(20, 184, 166, 0.05) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.location-selector-card {
  border: 2px solid rgba(14, 165, 233, 0.2) !important;
}
</style>
