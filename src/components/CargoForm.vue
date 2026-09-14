<script setup>
import { ref } from "vue";
const categorization = ref("Electronics");
const TransIsRotated = ref(false);

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
    <label for="destinationField">Cargo categorization: </label>
  </form>
</template>

<style scoped>
* {
  user-select: none;
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

  border: 1px solid;
  padding: 10px;
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
