<template>
  <v-app>
    <!-- Top Navigation Bar -->
    <v-app-bar
      app
      :elevation="scrolled ? 4 : 0"
      height="80"
      class="modern-navbar"
      :class="{ 'navbar-scrolled': scrolled }"
    >
      <v-container fluid class="d-flex align-center px-6">
        <!-- Logo -->
        <div class="logo-section">
          <v-icon size="36" color="primary" class="mr-2">mdi-airplane</v-icon>
          <span class="logo-text">Travel</span>
        </div>

        <v-spacer></v-spacer>

        <!-- Desktop Navigation -->
        <div class="nav-links d-none d-md-flex">
          <v-btn
            v-for="item in navItems"
            :key="item.value"
            :to="item.to"
            variant="text"
            class="nav-link-btn"
            :ripple="false"
          >
            {{ item.title }}
          </v-btn>
        </div>

        <!-- Mobile Menu Button -->
        <v-app-bar-nav-icon
          variant="text"
          @click="drawer = !drawer"
          class="d-md-none"
        ></v-app-bar-nav-icon>


      </v-container>
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      class="mobile-drawer"
    >
      <v-list nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          @click="drawer = false"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="main-content">
      <router-view></router-view>
    </v-main>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      location="top right"
      elevation="8"
      rounded="lg"
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar.show = false"
          icon="mdi-close"
        >
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      drawer: false,
      scrolled: false,
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      },
      navItems: [
        { title: 'Trang chủ', value: 'home', to: { name: 'Home' }, icon: 'mdi-home' },
        { title: 'Địa điểm', value: 'locations', to: { name: 'Locations' }, icon: 'mdi-map-marker' },
        { title: 'Loại địa điểm', value: 'location-types', to: { name: 'LocationTypes' }, icon: 'mdi-tag' },
        { title: 'Lịch đi chơi', value: 'trip-schedules', to: { name: 'TripSchedules' }, icon: 'mdi-calendar' },
        { title: 'Random địa điểm', value: 'random', to: { name: 'RandomLocation' }, icon: 'mdi-dice-multiple' },
        { title: 'Random từ Google Maps', value: 'google-maps-random', to: { name: 'GoogleMapsRandom' }, icon: 'mdi-google-maps' },
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('show-snackbar', (event) => {
      this.snackbar = {
        show: true,
        message: event.detail.message,
        color: event.detail.color || 'success'
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 10
    }
  }
}
</script>

<style scoped>
.modern-navbar {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.nav-links {
  gap: 8px;
  align-items: center;
}

.nav-link-btn {
  font-size: 16px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
  padding: 8px 20px;
  border-radius: 12px;
  color: #475569;
  position: relative;
  overflow: visible;
}

.nav-link-btn::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, #0EA5E9, #14B8A6);
  border-radius: 2px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link-btn:hover {
  color: #0EA5E9;
  background: rgba(14, 165, 233, 0.08);
}

.nav-link-btn:hover::before {
  transform: translateX(-50%) scaleX(1);
}

.v-btn--active.nav-link-btn {
  color: #0EA5E9;
  background: rgba(14, 165, 233, 0.12);
}

.v-btn--active.nav-link-btn::before {
  transform: translateX(-50%) scaleX(1);
}

.main-content {
  background: #FAFAFA;
  min-height: 100vh;
}
</style>

<style>
/* Global modern styles */
.v-application {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
}

.v-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: 1px solid rgba(14, 165, 233, 0.1) !important;
  overflow: hidden;
}

.v-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.03) 0%, rgba(20, 184, 166, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.v-card:hover::before {
  opacity: 1;
}

.v-card:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15), 0 10px 20px rgba(6, 182, 212, 0.1) !important;
  border-color: rgba(14, 165, 233, 0.2) !important;
}

.v-btn {
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  padding: 0 24px !important;
  height: auto !important;
  min-height: 44px !important;
}

.v-btn--size-default {
  min-height: 44px !important;
  padding: 12px 24px !important;
  font-size: 15px !important;
}

.v-btn--size-large {
  min-height: 48px !important;
  padding: 14px 32px !important;
  font-size: 16px !important;
}

.v-btn--size-x-large {
  min-height: 56px !important;
  padding: 16px 40px !important;
  font-size: 18px !important;
}

.v-btn .v-btn__content {
  white-space: nowrap;
}

.v-btn--variant-flat {
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.25) !important;
  color: white !important;
}

.v-btn--variant-flat:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.35) !important;
}

.v-btn--variant-outlined {
  border-width: 2px !important;
  background: transparent !important;
}

.v-btn--variant-outlined:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15) !important;
  background: transparent !important;
}

.mobile-drawer {
  background: linear-gradient(180deg, #0EA5E9 0%, #06B6D4 100%) !important;
}

.mobile-drawer .v-list-item {
  color: white !important;
  border-radius: 12px;
  margin: 4px 8px;
}

.mobile-drawer .v-list-item--active {
  background: rgba(255, 255, 255, 0.2) !important;
}
</style>
