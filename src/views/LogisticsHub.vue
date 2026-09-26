<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import CargoForm from "@/components/CargoForm.vue";
import AnalyticsBanner from "@/components/AnalyticsBanner.vue";
import LoginForm from "@/components/LoginForm.vue";
import ShipmentNetworkMap from "@/components/ShipmentNetworkMap.vue";
import ShipmentInformation from "@/components/ShipmentInformation.vue";
import MessageComponent from "@/components/MessageComponent.vue";
const isClicked = ref(false);
const NotificationsisClicked = ref(false);
const MessageisClicked = ref(false);
const LoginisClicked = ref(false);
const TransIsRotated = ref(false);
const status = ["MANIFEST_CREATED", "IN_TRANSIT", "HELD_IN_CUSTOMS", "DELIVERED"];
const props = defineProps({
  cargoManifest: {
    type: Array,
    required: true,
  },
  loginObject: {
    type: [Object, null],
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
  btnisClicked: {
    type: Object,
    required: true,
  },
});
const truckWrapperRef = ref(null);
const scrollProgress = ref(0);
watch(scrollProgress, (newProgress) => {
  if (truckWrapperRef.value) {
    const maxScroll = truckWrapperRef.value.scrollWidth - truckWrapperRef.value.clientWidth;
    const parsedProgress = parseFloat(newProgress);

    truckWrapperRef.value.scrollLeft = (parsedProgress / 100) * maxScroll;
  }
});
let workerTimeout = null;
onMounted(() => {
  if (props.loginObject?.isLogin && props.messages.length === 0) {
    triggerWelcomeBanner();
  }
});

watch(
  () => props.loginObject?.isLogin,
  (newIsLogin) => {
    if (newIsLogin) {
      triggerWelcomeBanner();
    }
  },
);

onUnmounted(() => {
  if (workerTimeout) clearTimeout(workerTimeout);
});

const emit = defineEmits(["add-cargo", "add-infos", "messages", "btn-clicked"]);

function submitClicked(val) {
  isClicked.value = false;
  emit("add-cargo", val);
}

function LoginClicked(val) {
  if (!val) return;

  emit("add-infos", val);
}

function saveMessages(val) {
  emit("messages", val);
}

function triggerWelcomeBanner() {
  if (workerTimeout) clearTimeout(workerTimeout);

  workerTimeout = setTimeout(() => {
    saveMessages("Welcome Back AKOUDAD Abdessamad");
  }, 3000);
}

function clicked() {
  isClicked.value = false;
  LoginisClicked.value = false;
  TransIsRotated.value = false;
  NotificationsisClicked.value = false;
  MessageisClicked.value = false;
}

function chevronClicked() {
  isClicked.value = false;
  LoginisClicked.value = false;
  NotificationsisClicked.value = false;
  MessageisClicked.value = false;
}

function loginisClicked() {
  isClicked.value = false;
  TransIsRotated.value = false;
  NotificationsisClicked.value = false;
  MessageisClicked.value = false;
}

function cargoClicked() {
  TransIsRotated.value = false;
  LoginisClicked.value = false;
  MessageisClicked.value = false;
  NotificationsisClicked.value = false;
}

function notificationsisClicked() {
  isClicked.value = false;
  TransIsRotated.value = false;
  LoginisClicked.value = false;
  MessageisClicked.value = false;
}

function messageisClicked() {
  isClicked.value = false;
  TransIsRotated.value = false;
  LoginisClicked.value = false;
  NotificationsisClicked.value = false;
}

function chevron() {
  TransIsRotated.value = !TransIsRotated.value;
}
</script>

<template>
  <header class="navbar-top" @click="clicked" :data-theme="btnisClicked?.value ? 'dark' : 'light'">
    <div
      class="custom-select"
      v-if="loginObject?.isLogin && loginObject"
      @click.stop="if (TransIsRotated) chevronClicked();"
    >
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
    <div
      class="notifications"
      @click.stop="
        NotificationsisClicked = !NotificationsisClicked;
        if (NotificationsisClicked) notificationsisClicked();
      "
    >
      <i class="fa-regular fa-bell"></i>
    </div>
    <div
      class="messages"
      @click.stop="
        MessageisClicked = !MessageisClicked;
        if (MessageisClicked) messageisClicked();
      "
      :class="{ not: messages.length && loginObject?.isLogin }"
    >
      <i class="fa-regular fa-message"></i>
    </div>
    <div
      class="login"
      @click.stop="
        LoginisClicked = !LoginisClicked;
        if (LoginisClicked) loginisClicked();
      "
    >
      <i class="fa-regular fa-user"></i>
    </div>
  </header>
  <div
    class="dashboard-items"
    @click="clicked()"
    :data-theme="btnisClicked?.value ? 'dark' : 'light'"
  >
    <div class="left-dashboard-panel">
      <ShipmentInformation class="info-area" :btnisClicked="{ value: btnisClicked.value }" />
      <ShipmentNetworkMap class="map-area" :btnisClicked="{ value: btnisClicked.value }" />
    </div>
    <div class="right-dashboard-panel">
      <AnalyticsBanner
        :cargoManifest="cargoManifest"
        class="banner-area"
        :btnisClicked="{ value: btnisClicked.value }"
      />
      <div class="cargo-truck">
        <div class="slicer">
          <div class="slider-rail-wrapper">
            <input
              type="range"
              min="0"
              max="100"
              step="0.01"
              v-model="scrollProgress"
              class="custom-scale-slider"
            />
          </div>
          <div class="cargo-truck-container" ref="truckWrapperRef">
            <img src="../assets/cargo-truck-background.png" alt="cargo truck" />
          </div>
        </div>
        <!--<button
          @click.stop="
            isClicked = !isClicked;
            if (isClicked) cargoClicked();
          "
        >
          Click Me
        </button>-->
      </div>
    </div>
  </div>
  <Transition name="shrink-square">
    <div class="dashboard-view" v-if="isClicked" @click.stop>
      <CargoForm
        @submit-clicked="submitClicked($event)"
        :cargoManifest="cargoManifest"
        :btnisClicked="{ value: btnisClicked.value }"
      />
    </div>
  </Transition>

  <Transition name="shrink-square-login">
    <div class="dashboard-view-login" v-show="LoginisClicked" @click.stop>
      <LoginForm @login-infos="LoginClicked" :btnisClicked="{ value: btnisClicked.value }" />
    </div>
  </Transition>
  <Transition name="shrink-square-login">
    <div class="dashboard-view-login" v-show="NotificationsisClicked" @click.stop>
      <MessageComponent
        :message="{ value: 'Notifications' }"
        :messageValue="messages"
        :isLogin="{ value: loginObject?.isLogin }"
        :btnisClicked="{ value: btnisClicked.value }"
      />
    </div>
  </Transition>
  <Transition name="shrink-square-login">
    <div class="dashboard-view-login" v-show="MessageisClicked" @click.stop>
      <MessageComponent
        :message="{ value: 'Messages' }"
        :messageValue="messages"
        :isLogin="{ value: loginObject?.isLogin }"
        :btnisClicked="{ value: btnisClicked.value }"
      />
    </div>
  </Transition>
</template>

<style scoped>
i {
  color: var(--icon-color);
}

.loginName {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.messages {
  position: relative;
}

.cargo-truck-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 550px;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius: 12px;

  scroll-behavior: smooth;
}

.cargo-truck-container img {
  width: 1500px;
  height: 1200px;
  object-fit: cover;
  object-position: center 180%;
  display: block;
}

.slider-rail-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  padding: 0 40px;

}

.custom-scale-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  max-width: 150px;
  height: 6px;
  background-color: var(--text-muted);
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  align-self: end;
}

.custom-scale-slider::-webkit-scrollbar-thumb,
.custom-scale-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;

  width: 60px;
  height: 14px;
  background-color: var(--text-main);
  border-radius: 20px;
  border: 2px solid var(--bg-card);
  box-shadow: 0 1px 4px rgba(var(--shadow-color), 0.15);
  transition:
    transform 0.1s ease,
    background-color 0.1s ease;
}

.custom-scale-slider::-webkit-slider-thumb:hover {
  transform: scaleY(1.15);
}

.custom-scale-slider::-moz-range-thumb {
  width: 60px;
  height: 14px;
  border-radius: 20px;
  border: 2px solid var(--border-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.not::before {
  content: "";
  position: absolute;
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 0;
  left: -50%;
  transform: translateX(50%);
}

.left-dashboard-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: space-around;
}
.right-dashboard-panel {
  display: grid;
  grid-template-rows: 1fr 7fr;
  gap: 24px;
  height: 100%;
}
.dashboard-items {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 24px;
  width: 100%;
  min-height: 100%;
  padding: 40px;
  background-color: var(--bg-main);
}
.banner-area {
  height: fit-content;
  align-self: start;
}
.slicer {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cargo-truck {
  display: flex;
  align-items: flex-start;
  justify-content: end;
}

.info-area,
.map-area {
  width: 100%;
  height: fit-content;
}

.info-area {
  grid-area: info;
}

.map-area {
  grid-area: map;
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
  background-color: var(--bg-main);
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
  color: var(--text-main);
  gap: 5px;
  list-style: none;
  cursor: pointer;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: var(--bg-card);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  margin-top: 5px;
  transform-origin: center top;
  z-index: 10;
}

span,
.select-options li {
  color: var(--text-main);
  font-size: 13px;
  font-weight: bold;
  padding: 5px 7px;
  text-align: center;
}

.select-options li:hover {
  background-color: var(--bg-button-hover);
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

  color: var(--text-main);

  padding: 5px 7px;
  border: 1px solid var(--bg-button-hover);
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
