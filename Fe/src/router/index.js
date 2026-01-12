import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Locations from '../views/Locations.vue'
import LocationTypes from '../views/LocationTypes.vue'
import TripSchedules from '../views/TripSchedules.vue'
import RandomLocation from '../views/RandomLocation.vue'
import GoogleMapsRandom from '../views/GoogleMapsRandom.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations
  },
  {
    path: '/location-types',
    name: 'LocationTypes',
    component: LocationTypes
  },
  {
    path: '/trip-schedules',
    name: 'TripSchedules',
    component: TripSchedules
  },
  {
    path: '/random',
    name: 'RandomLocation',
    component: RandomLocation
  },
  {
    path: '/google-maps-random',
    name: 'GoogleMapsRandom',
    component: GoogleMapsRandom
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


