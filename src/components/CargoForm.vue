<script setup>
import { ref } from "vue";
const categorization = ref("Electronics");
const TransIsRotated = ref(false);

function chevron() {
  TransIsRotated.value = !TransIsRotated.value;
}

function selectOption(val) {
  categorization.value = val;
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="dispatchSignal" class="form-container">
      <label for="destinationField">Destination City: </label>
      <input
        name="destinationField"
        id="destinationField"
        type="text"
        class="destination-field"
        placeholder="e.g., Tokyo (NRT) or Casablanca (CMN)"
      />
      <label for="destinationField">Cargo categorization: </label>
      <div class="custom-select">
        <div class="select-trigger" @click="chevron">
          <span>{{ categorization }}</span>
          <div>
            <i class="fa-solid fa-chevron-down" :class="{ 'rotated-state': TransIsRotated }"></i>
          </div>
        </div>
        <ul class="select-options" :class="{ displayed: !TransIsRotated }">
          <li @click="selectOption('Electronics')">Electronics</li>
          <li @click="selectOption('Medical Supplies')">Medical Supplies</li>
          <li @click="selectOption('Perishables')">Perishables</li>
        </ul>
      </div>
    </form>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
.form-container {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.displayed {
  display: none;
}
.select-trigger {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.rotated-state {
  transform: rotate(180deg);
}

.select-options {
  list-style: none;
  cursor: pointer;
}
</style>
