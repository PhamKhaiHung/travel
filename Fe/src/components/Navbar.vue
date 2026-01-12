<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/" class="navbar-brand">
          <span class="brand-icon">🎯</span>
          <span class="brand-text">Food App</span>
        </router-link>
        <div class="navbar-menu">
          <router-link to="/" class="nav-link">Trang chủ</router-link>
          <router-link to="/locations" class="nav-link">Địa điểm</router-link>
          <router-link to="/location-types" class="nav-link">Loại địa điểm</router-link>
          <router-link to="/trip-schedules" class="nav-link">Lịch đi chơi</router-link>
          <router-link to="/random" class="nav-link">Random</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.brand-icon {
  font-size: 28px;
}

.brand-text {
  font-size: 20px;
}

.navbar-menu {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .navbar-menu {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-sm);
  }
  
  .nav-link {
    font-size: 14px;
    padding: var(--spacing-xs) var(--spacing-sm);
  }
}
</style>


