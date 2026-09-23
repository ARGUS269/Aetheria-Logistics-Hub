<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import CargoForm from "@/components/CargoForm.vue";
import AnalyticsBanner from "@/components/AnalyticsBanner.vue";
import LoginForm from "@/components/LoginForm.vue";
const isClicked = ref(false);
const LoginisClicked = ref(false);
const TransIsRotated = ref(false);
const isLogin = ref(false);
const loginObject = ref(null);
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

function LoginClicked(val) {
  if (!val) return;

  try {
    loginObject.value = val;
    isLogin.value = val.isLogin !== undefined ? val.isLogin : false;
  } catch (error) {
    console.error("Crash inside LoginClicked logic handler:", error);
  }
}

function clicked() {
  isClicked.value = false;
  LoginisClicked.value = false;
  TransIsRotated.value = false;
}

function chevronClicked() {
  isClicked.value = false;
  LoginisClicked.value = false;
}

function loginClicked() {
  isClicked.value = false;
  TransIsRotated.value = false;
}

function cargoClicked() {
  TransIsRotated.value = false;
  LoginisClicked.value = false;
}

function chevron() {
  TransIsRotated.value = !TransIsRotated.value;
}
</script>

<template>
  <header class="navbar-top" @click="clicked">
    <div class="custom-select" v-if="isLogin && loginObject" @click.stop="if(TransIsRotated) chevronClicked();">
      <div class="select-trigger" @click="chevron">
        <span>{{ loginObject?.fullName }}</span>
        <div>
          <i class="fa-solid fa-chevron-down" :class="{ 'rotated-state': TransIsRotated }"></i>
        </div>
      </div>
      <Transition name="shrink-square">
        <ul class="select-options" v-if="TransIsRotated">
          <li class="first-li" @click="chevron">{{ loginObject?.fullName }}</li>
        </ul>
      </Transition>
    </div>
    <div class="notifications"><i class="fa-regular fa-bell"></i></div>
    <div class="messages"><i class="fa-regular fa-message"></i></div>
    <div
      class="login"
      @click.stop="
        LoginisClicked = !LoginisClicked;
        if (LoginisClicked) loginClicked();
      "
    >
      <i class="fa-regular fa-user"></i>
    </div>
  </header>
  <div class="dashboard-items" @click="clicked()">
    <button
      @click.stop="
        isClicked = !isClicked;
        if (isClicked) cargoClicked();
      "
    >
      Click Me
    </button>
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
    <div class="dashboard-view-login" v-show="LoginisClicked" @click.stop>
      <LoginForm @login-infos="LoginClicked" />
    </div>
  </Transition>
</template>

<style scoped>
i {
  color: #4b5563;
}

.loginName {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  position: relative;
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

.custom-select {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
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

.select-options li {
  color: #333333;

  padding: 10px 14px;
}

.select-options li:hover {
  background-color: #cccccc;
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
  gap: 10px;
}

.select-trigger div i {
  transition: transform 0.3s ease;
}

.rotated-state {
  transform: rotate(180deg);
}
</style>
