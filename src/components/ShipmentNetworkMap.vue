<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
</script>

<template>
  <div class="body">
    <div class="head">
      <h3>Shipment Network Map</h3>
      <i class="fa-solid fa-arrow-up"></i>
    </div>
    <div class="dashboard-grid">
      <div class="square" v-for="value in 40" :key="value"></div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 30px;
  border-radius: 16px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.05),
    0 1px 2px -1px rgba(0, 0, 0, 0.05);
  gap: 20px;
}
.fa-arrow-up{
  transform: rotate(45deg);
  cursor: pointer;
}
.head {
  display: flex;
  justify-content: space-between;
}
.dashboard-grid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  background-color: #eeeeee;
  gap: 3px;
}

.square {
  background-color: #ffffff;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
