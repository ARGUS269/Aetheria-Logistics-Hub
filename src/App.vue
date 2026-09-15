<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="top">
        <div class="nav-brand">AG</div>
        <div class="nav-links">
          <RouterLink to="/logistic" class="nav-item">
            <i class="fa-solid fa-truck"></i>
          </RouterLink>
        </div>
      </div>
      <div class="bottom">
        <RouterLink to="/settings" class="nav-item">
          <i class="fa-solid fa-gear"></i>
        </RouterLink>
      </div>
    </nav>

    <main class="app-viewport">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.top,
.bottom {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 8px 6px;
  gap: 20px;
  box-shadow: 4px 0 6px -1px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e2e8f0;
  height: 100vh;
  width: 50px;
  flex-shrink: 0;

  position: relative;
  z-index: 50;
}
.app-viewport {
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 800;
  color: #4b5563;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
}

i{
  color: #4b5563;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.nav-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 1.25rem;
  padding: 12px;
  color: #333;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

* {
  user-select: none;
}

.nav-item:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}
</style>
