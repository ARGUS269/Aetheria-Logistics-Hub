<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import CargoForm from "@/components/CargoForm.vue";
const isClicked = ref(false);
const status = ["MANIFEST_CREATED", "IN_TRANSIT", "HELD_IN_CUSTOMS", "DELIVERED"];
// The Phase: The cargo hit an international border and got frozen by border agents due to a documentation mismatch or a security inspection flag.
const cargoManifest = ref([
  {
    id: "TRK-1002",
    destination: "Tokyo (NRT)",
    cargoType: "Electronics",
    weight: 450,
    value: 12000,
    status: "IN_TRANSIT",
    transitProgress: 45,
  },
  {
    id: "TRK-5541",
    destination: "London (LHR)",
    cargoType: "Medical Supplies",
    weight: 120,
    value: 25000,
    status: "HELD_IN_CUSTOMS",
    transitProgress: 20,
  },
]);

function submitClicked(val) {
  isClicked.value = false;
  cargoManifest.value.push(val);
  console.log(cargoManifest.value);

}
</script>

<template>
  <div class="dashboard-items" @click="isClicked = false">
    <button @click="isClicked = !isClicked" @click.stop>Click Me</button>
  </div>
  <Transition name="shrink-square">
    <div class="dashboard-view" v-if="isClicked" @click.stop>
      <CargoForm @submit-clicked="submitClicked" :cargoManifest="cargoManifest" />
    </div>
  </Transition>
</template>

<style scoped>
.dashboard-items {
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.dashboard-view {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  transform: translate(-50%, -50%) scale(0.4);
}
</style>
