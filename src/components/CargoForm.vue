<script setup>
import { ref } from "vue";
const categorization = ref("Electronics");
const TransIsRotated = ref(false);
const massValue = ref(10);

function chevron() {
  TransIsRotated.value = !TransIsRotated.value;
}

function selectOption(val) {
  categorization.value = val;
  TransIsRotated.value = !TransIsRotated.value;
}
</script>

<template>
  <form @submit.prevent="dispatchSignal" class="form-container">
    <label for="destinationField">Destination City: </label>
    <input
      name="destinationField"
      id="destinationField"
      type="text"
      class="destination-field"
      placeholder="e.g., Tokyo (NRT)..."
    />
    <label for="destinationField">Cargo categorization: </label>
    <div class="custom-select">
      <div class="select-trigger" @click="chevron">
        <span>{{ categorization }}</span>
        <div>
          <i class="fa-solid fa-chevron-down" :class="{ 'rotated-state': TransIsRotated }"></i>
        </div>
      </div>
      <Transition name="shrink-square">
        <ul class="select-options" v-if="TransIsRotated">
          <li class="first-li" @click="selectOption('Electronics')">Electronics</li>
          <li @click="selectOption('Medical Supplies')">Medical Supplies</li>
          <li @click="selectOption('Perishables')">Perishables</li>
        </ul>
      </Transition>
    </div>
    <div class="mass-slider-card">
      <label for="scale-slider">Cargo Mass Scale:</label>
      <div class="slider-wrapper">
        <input
          type="range"
          id="scale-slider"
          min="0"
          max="2000"
          step="10"
          list="scale-markers"
          v-model="massValue"
        />

        <div class="scale-ticks">
          <span>10kg</span>
          <span>500kg</span>
          <span>1000kg</span>
          <span>1500kg</span>
          <span>2000kg</span>
        </div>
      </div>
      <div class="mass-display">
        <span id="massValue">{{ massValue }}</span> kg
      </div>
    </div>
  </form>
</template>

<style scoped>
* {
  user-select: none;
}

label {
  padding: 5px 10px;
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.slider-wrapper {
  position: relative;
  margin-bottom: 20px;
}

input[type="range"] {
  width: 100%;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 9999px;
  background: #e5e7eb;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #059669; /* Emerald Green */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    background 0.15s ease-in-out,
    transform 0.1s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #047857;
  transform: scale(1.1);
}

.scale-ticks {
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  margin-top: 10px;
}

.scale-ticks span {
  font-size: 12px;
  color: #9ca3af;
  position: relative;
  text-align: center;
}

.scale-ticks span::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 6px;
  background-color: #d1d5db;
}

.destination-field {
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;

  padding: 10px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  outline: none;
}

.destination-field::placeholder {
  color: #888888;
  font-weight: 400;
}

.select-options li {
  color: #333333;

  padding: 10px 14px;
}

.select-options li:hover {
  background-color: #cccccc;
}

.form-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 30px;
}

.custom-select {
  position: relative;
}

.select-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  cursor: pointer;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #cccccc;
  margin-top: 5px;
  transform-origin: center top;
  z-index: 10;
}

.shrink-square-enter-active,
.shrink-square-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.shrink-square-enter-from,
.shrink-square-leave-to {
  opacity: 0;
  transform: scale(0.4);
}

.select-trigger {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  color: #333333;

  padding: 10px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
}

.select-trigger div i {
  transition: transform 0.3s ease;
}

.rotated-state {
  transform: rotate(180deg);
}
</style>
