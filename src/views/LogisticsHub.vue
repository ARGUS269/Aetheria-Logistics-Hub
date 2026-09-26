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
    type: Object,
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
    <!--<button
      @click.stop="
        isClicked = !isClicked;
        if (isClicked) cargoClicked();
      "
    >
      Click Me
    </button>-->
    <ShipmentInformation class="info-area" :btnisClicked="{ value: btnisClicked.value }" />
    <ShipmentNetworkMap class="map-area" :btnisClicked="{ value: btnisClicked.value }" />
    <AnalyticsBanner
      :cargoManifest="cargoManifest"
      class="banner-area"
      :btnisClicked="{ value: btnisClicked.value }"
    />
    <div class="cargo-truck"></div>
  </div>
  <Transition name="shrink-square">
    <div class="dashboard-view" v-if="isClicked" @click.stop>
      <CargoForm @submit-clicked="submitClicked" :btnisClicked="{ value: btnisClicked.value }" />
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

.dashboard-items {
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  background-color: var(--bg-main);
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 24px;
  grid-template-areas:
    "info  banner"
    "map    truck";
}
.banner-area {
  grid-area: banner;
  height: fit-content;
  align-self: self-start;
}

.cargo-truck {
  grid-area: truck;
}

.info-area {
  grid-area: info;
  height: fit-content;
  margin-top: 68px;
}

.map-area {
  grid-area: map;
  height: fit-content;
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
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
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
