<template>
  <div class="page-wrapper">
    <!-- Hero Section -->
    <section class="page-hero">
      <div class="hero-overlay"></div>
      <div class="hero-background" style="background-image: url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop');"></div>
      
      <v-container class="hero-container">
        <div class="hero-content text-center">
          <h1 class="hero-title-white mb-4">Loại địa điểm</h1>
          <p class="hero-description-white mb-8">
            Phân loại và quản lý các danh mục địa điểm yêu thích
          </p>
          <v-btn
            color="white"
            variant="flat"
            size="x-large"
            @click="openCreateModal"
            class="hero-action-btn"
          >
            Thêm loại mới
          </v-btn>
        </div>
      </v-container>
    </section>

    <v-container class="content-section py-12">
    <!-- Loading -->
    <v-row v-if="loading">
      <v-col cols="12" class="text-center py-12">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-row v-else-if="locationTypes.length === 0">
      <v-col cols="12">
        <v-card class="pa-12 text-center" elevation="0">
          <v-icon size="120" color="grey-lighten-1">mdi-tag-off</v-icon>
          <v-card-title class="text-h5 mt-4">Chưa có loại địa điểm nào</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Types Table -->
    <v-row v-else>
      <v-col cols="12">
        <v-card elevation="4" class="table-card">
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :items="locationTypes"
              :items-per-page="10"
              class="elevation-0"
            >
              <template v-slot:top>
                <v-toolbar flat class="px-4 py-2">
                  <v-toolbar-title class="text-h6 font-weight-bold">
                    Danh sách loại địa điểm
                  </v-toolbar-title>
                </v-toolbar>
              </template>

              <template v-slot:item.description="{ item }">
                <span class="text-body-2">{{ item.description || 'Chưa có mô tả' }}</span>
              </template>

              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-2">
                  <v-btn
                    color="primary"
                    variant="flat"
                    size="default"
                    @click="openEditModal(item)"
                    style="min-width: 100px"
                  >
                    Sửa
                  </v-btn>
                  <v-btn
                    color="error"
                    variant="flat"
                    size="default"
                    @click="handleDelete(item.id)"
                    style="min-width: 100px"
                  >
                    Xóa
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create/Edit Dialog -->
    <v-dialog v-model="showModal" max-width="700" persistent scrollable>
      <v-card class="modern-dialog">
        <v-card-title class="text-h5 pa-6 modern-dialog-title">
          <v-icon class="mr-3" size="28">{{ editingType ? 'mdi-pencil' : 'mdi-plus-circle' }}</v-icon>
          {{ editingType ? 'Sửa loại địa điểm' : 'Thêm loại địa điểm mới' }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="form.name"
              label="Tên loại địa điểm *"
              variant="outlined"
              :rules="[rules.required]"
              required
              class="mb-2"
            ></v-text-field>
            <v-textarea
              v-model="form.description"
              label="Mô tả"
              variant="outlined"
              rows="3"
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
            {{ editingType ? 'Cập nhật' : 'Tạo mới' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { locationTypeApi } from '../services/api'
import { useSnackbar } from '../composables/useSnackbar'

export default {
  name: 'LocationTypes',
  setup() {
    const snackbar = useSnackbar()
    return { snackbar }
  },
  data() {
    return {
      locationTypes: [],
      loading: false,
      submitting: false,
      showModal: false,
      valid: false,
      editingType: null,
      form: {
        name: '',
        description: ''
      },
      headers: [
        { title: 'Tên loại địa điểm', key: 'name', sortable: true },
        { title: 'Mô tả', key: 'description', sortable: false },
        { title: 'Thao tác', key: 'actions', sortable: false, align: 'start', width: '250px' }
      ],
      rules: {
        required: value => !!value || 'Trường này là bắt buộc'
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const response = await locationTypeApi.getAll()
        this.locationTypes = response.data
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error)
        this.snackbar.error('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối backend.')
      } finally {
        this.loading = false
      }
    },
    openCreateModal() {
      this.editingType = null
      this.form = { name: '', description: '' }
      this.showModal = true
    },
    openEditModal(type) {
      this.editingType = type
      this.form = { ...type }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.editingType = null
      this.$refs.form?.resetValidation()
    },
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      this.submitting = true
      try {
        if (this.editingType) {
          await locationTypeApi.update(this.editingType.id, this.form)
          this.snackbar.success('Cập nhật loại địa điểm thành công!')
        } else {
          await locationTypeApi.create(this.form)
          this.snackbar.success('Tạo loại địa điểm thành công!')
        }
        this.closeModal()
        this.loadData()
      } catch (error) {
        console.error('Lỗi khi lưu loại địa điểm:', error)
        this.snackbar.error('Không thể lưu loại địa điểm. Vui lòng thử lại.')
      } finally {
        this.submitting = false
      }
    },
    async handleDelete(id) {
      if (!confirm('Bạn có chắc chắn muốn xóa loại địa điểm này?')) return
      try {
        await locationTypeApi.delete(id)
        this.snackbar.success('Xóa loại địa điểm thành công!')
        this.loadData()
      } catch (error) {
        console.error('Lỗi khi xóa loại địa điểm:', error)
        this.snackbar.error('Không thể xóa loại địa điểm. Vui lòng thử lại.')
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

.table-card {
  background: white !important;
  border: 1px solid #E2E8F0;
  border-radius: 20px !important;
  overflow: hidden;
}

.table-card :deep(.v-data-table) {
  background: transparent;
}

.table-card :deep(.v-data-table__wrapper) {
  border-radius: 0;
}

.table-card :deep(.v-data-table-header) {
  background: rgba(14, 165, 233, 0.05);
}

.table-card :deep(th) {
  font-weight: 700 !important;
  color: #0EA5E9 !important;
}

.table-card :deep(tr:hover) {
  background: rgba(14, 165, 233, 0.03) !important;
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
