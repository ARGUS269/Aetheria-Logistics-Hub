<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="app-layout">
    <nav class="navbar">
      <div class="nav-brand">AG</div>
      <div class="nav-brand"></div>
      <div class="nav-links">
        <RouterLink to="/logistic" class="nav-item"><i class="fa-solid fa-truck"></i></RouterLink>
      </div>
    </nav>

    <main class="app-viewport">
      <RouterView />
    </main>
  </div>
</template>

<style>

.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 8px 12px;
  gap: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #e2e8f0;
  height: 100vh;
  width: fit-content;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 800;
  color: #5c4bb6;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: #5c4bb6;
  background-color: #f1f5f9;
}

.router-link-active {
  color: #5c4bb6;
  background-color: #efecf9;
}
</style>
