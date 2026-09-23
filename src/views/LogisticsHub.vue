<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import CargoForm from "@/components/CargoForm.vue";
import AnalyticsBanner from "@/components/AnalyticsBanner.vue";
import LoginForm from "@/components/LoginForm.vue";
const isClicked = ref(false);
const LoginisClicked = ref(false);
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

const totalVol = computed(() => {
  return cargoManifest.value.reduce((accumulator, item) => {
    return accumulator + parseInt(item.value);
  }, 0);
});

const totalMass = computed(() => {
  return cargoManifest.value.reduce((accumulator, item) => {
    return accumulator + parseInt(item.weight);
  }, 0);
});

function submitClicked(val) {
  isClicked.value = false;
  cargoManifest.value.push(val);
}

function clicked() {
  LoginisClicked.value = false;
  isClicked.value = false;
}
</script>

<template>
  <header class="navbar-top" @click="clicked">
    <div class="notifications"><i class="fa-regular fa-bell"></i></div>
    <div class="messages"><i class="fa-regular fa-message"></i></div>
    <div class="login" @click="LoginisClicked = !LoginisClicked" @click.stop>
      <i class="fa-regular fa-user"></i>
    </div>
  </header>
  <div class="dashboard-items" @click="clicked">
    <button @click="isClicked = !isClicked" @click.stop>Click Me</button>
    <AnalyticsBanner
      :cargoManifest="cargoManifest"
      :totals="{ previousVolValue: totalVol, previousMassValue: totalMass }"
    />
  </div>
  <Transition name="shrink-square">
    <div class="dashboard-view" v-if="isClicked" @click.stop>
      <CargoForm @submit-clicked="submitClicked" :cargoManifest="cargoManifest" />
    </div>
  </Transition>

  <Transition name="shrink-square-login">
    <div class="dashboard-view-login" v-if="LoginisClicked" @click.stop>
      <LoginForm />
    </div>
  </Transition>
</template>

<style scoped>
i {
  color: #4b5563;
}

.dashboard-items {
  width: 100vw;
  min-height: 100vh;
  position: fixed;
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

.dashboard-view-login {
  position: absolute;
  top: 50px;
  right: 30px;
}

.shrink-square-login-enter-active,
.shrink-square-login-leave-active {
  transition:
    opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  transform-origin: top right;
}

.shrink-square-login-enter-from,
.shrink-square-login-leave-to {
  opacity: 0;
  transform: scale(0.4);
}

.navbar-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  gap: 24px;
  width: 100%;
  height: 56px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  flex-shrink: 0;
}

.navbar-top div {
  cursor: pointer;
  font-size: 1.15rem;
}
</style>
