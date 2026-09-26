<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const props = defineProps({
  btnisClicked: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="body" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
    <div class="head">
      <h3>Shipment Network Map</h3>
      <i class="fa-solid fa-arrow-up"></i>
    </div>
    <div class="dashboard-grid">
      <div class="square" v-for="value in 48" :key="value"></div>
      <div class="keys">
        <div class="green"></div>
        <div class="orange"></div>
        <div class="red"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 30px 30px;
  border-radius: 16px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.05),
    0 1px 2px -1px rgba(0, 0, 0, 0.05);
  gap: 20px;
  background-color: var(--bg-card);
}
.fa-arrow-up {
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
  background-color: var(--border-color);
  gap: 3px;
  position: relative;
}

.keys {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 20px;
  transform: translateX(-50%);
  bottom: 0;
  gap: 12px;
}

.keys div {
  width: 3px;
  height: 20px;
  border-radius: 12px;
  position: relative;
}
.keys div::after {
  position: absolute;
  color: var(--text-muted);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 24px;
  height: 24px;
  white-space: nowrap;
  margin-left: 10px;
}

.green {
  background-color: #61d733;
}

.green::after {
  content: "On Schedule";
}

.red {
  background-color: #b83f4d;
}

.red::after {
  content: "Issue Detected";
}

.orange {
  background-color: #fec38e;
}

.orange::after {
  content: "Delayed";
}

.square {
  background-color: var(--bg-card);
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
