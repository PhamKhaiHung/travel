import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Location Types API
export const locationTypeApi = {
  getAll: () => api.get('/location-types'),
  getById: (id) => api.get(`/location-types/${id}`),
  create: (data) => api.post('/location-types', data),
  update: (id, data) => api.put(`/location-types/${id}`, data),
  delete: (id) => api.delete(`/location-types/${id}`)
}

// Locations API
export const locationApi = {
  getAll: () => api.get('/locations'),
  getById: (id) => api.get(`/locations/${id}`),
  create: (data) => api.post('/locations', data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
  search: (name) => api.get('/locations/search', { params: { name } }),
  filterByType: (typeId) => api.get('/locations/filter', { params: { typeId } }),
  getRandom: () => api.get('/locations/random'),
  getRandomMultiple: (count) => api.get(`/locations/random/${count}`)
}

// Trip Schedules API
export const tripScheduleApi = {
  getAll: () => api.get('/trip-schedules'),
  getById: (id) => api.get(`/trip-schedules/${id}`),
  create: (data) => api.post('/trip-schedules', data),
  update: (id, data) => api.put(`/trip-schedules/${id}`, data),
  delete: (id) => api.delete(`/trip-schedules/${id}`)
}

export default api


